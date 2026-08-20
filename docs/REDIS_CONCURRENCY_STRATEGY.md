# Redis & Concurrency Strategy

This document explains how FlashERP handles extreme high-concurrency traffic during a flash deal (e.g., thousands of users attempting to add the same product to their cart at the exact same second) using Redis and Lua scripting.

## 1. The Core Challenge
In a traditional SQL database, allowing 10,000 users to concurrently update stock for a single item leads to database locking, deadlocks, and connection pool exhaustion. 
To solve this, FlashERP uses **Redis** as an in-memory lock and reservation engine. The Postgres database is only updated *after* a successful payment.

## 2. Redis Key Structure

1. **Available Stock Key:** `deal:{deal_id}:variant:{variant_id}:stock` (Integer)
   - Pre-loaded from Postgres before the deal starts.
2. **User Reservation Key:** `reservation:user:{user_id}:deal:{deal_id}` (String)
   - Tracks if a user currently has an active cart reservation. Has a TTL (e.g., 600s / 10 mins).
3. **Variant Allocation Hash:** `reservation_details:user:{user_id}:deal:{deal_id}` (Hash)
   - Stores exactly which variant and how much qty the user reserved.

## 3. Atomic Operations (Lua Scripts)

Because Redis is single-threaded, a Lua script executes atomically. No other commands can run while the script is executing, guaranteeing zero race conditions and preventing overselling.

### 3.1 Reserve Stock Script (`reserve.lua`)
When a user clicks "Add to Cart":

```lua
-- KEYS[1]: stock_key
-- KEYS[2]: user_reservation_key
-- ARGV[1]: requested_qty
-- ARGV[2]: ttl_seconds (600)

-- 1. Check if user already has a reservation
if redis.call('EXISTS', KEYS[2]) == 1 then
    return {0, "ALREADY_RESERVED"}
end

-- 2. Check available stock
local available = tonumber(redis.call('GET', KEYS[1]) or '0')
if available < tonumber(ARGV[1]) then
    return {0, "OUT_OF_STOCK"}
end

-- 3. Reserve the stock (decrement)
redis.call('DECRBY', KEYS[1], ARGV[1])

-- 4. Create user reservation lock with TTL
redis.call('SETEX', KEYS[2], tonumber(ARGV[2]), "RESERVED")

return {1, "SUCCESS"}
```

### 3.2 Release Stock Script (`release.lua`)
Triggered if a user explicitly removes the item from the cart, or if the TTL expires.

```lua
-- KEYS[1]: stock_key
-- KEYS[2]: user_reservation_key
-- ARGV[1]: qty_to_return

-- 1. Return stock
redis.call('INCRBY', KEYS[1], ARGV[1])

-- 2. Delete user reservation lock
redis.call('DEL', KEYS[2])

return {1, "RELEASED"}
```

## 4. Handling TTL Expiry (Timeout)

When a user's 10-minute cart window expires, the stock must be returned automatically so other users can buy it.

**The Approach: Redis Keyspace Notifications**
1. Redis is configured to publish events when keys expire: `CONFIG SET notify-keyspace-events Ex`
2. A dedicated Node.js Worker (or BullMQ job) subscribes to `__keyevent@0__:expired`.
3. When `reservation:user:{user_id}:deal:{deal_id}` expires, the worker reads the previously stored Variant Allocation Hash.
4. The worker executes `release.lua` to atomically return the stock to the available pool.
5. The WebSocket server is notified, which pushes a `RESERVATION_EXPIRED` event to the specific client's browser, clearing their cart UI.

## 5. BullMQ Checkout Queue

To protect the Postgres database from spikes during actual checkout (payment creation and order saving):
1. The API validates the Redis reservation.
2. The order payload is pushed into a **BullMQ Queue** (Redis-backed).
3. Background workers process the queue at a safe, controlled rate (e.g., 200 orders/sec), inserting records into Postgres and calculating GST cleanly without overwhelming the database CPU.
