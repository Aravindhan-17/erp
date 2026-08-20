# FlashERP API Specification

This document outlines the core RESTful endpoints and WebSocket events required for the FlashERP system, particularly focusing on the B2C Storefront and the Flash Deal Engine.

## 1. Authentication APIs

### 1.1 Request OTP (Login/Register)
- **Endpoint:** `POST /api/auth/request-otp`
- **Description:** Sends an OTP to the user's mobile number.
- **Request Body:**
  ```json
  {
    "phone": "+919876543210"
  }
  ```
- **Response:** `200 OK`
  ```json
  { "message": "OTP sent successfully", "expires_in": 300 }
  ```

### 1.2 Verify OTP
- **Endpoint:** `POST /api/auth/verify-otp`
- **Request Body:**
  ```json
  {
    "phone": "+919876543210",
    "otp": "123456"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "token": "jwt_access_token",
    "refresh_token": "jwt_refresh_token",
    "user": { "id": "uuid", "first_name": "John" }
  }
  ```

---

## 2. Flash Deals APIs

### 2.1 Get Active Deals
- **Endpoint:** `GET /api/deals/active`
- **Description:** Returns currently active or upcoming flash deals.
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "uuid",
      "name": "Diwali Mega Sale",
      "registration_fee": 1.00,
      "deal_start": "2024-10-25T10:00:00Z",
      "deal_end": "2024-10-25T14:00:00Z"
    }
  ]
  ```

### 2.2 Register for a Deal
- **Endpoint:** `POST /api/deals/{dealId}/register`
- **Description:** Initiates payment for the ₹1 registration fee.
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK`
  ```json
  {
    "registration_id": "uuid",
    "payment_gateway_order_id": "order_xyz",
    "amount": 1.00
  }
  ```

---

## 3. Cart & Reservation APIs (High Concurrency)

### 3.1 Add to Cart (Reserve Stock)
- **Endpoint:** `POST /api/cart/add`
- **Description:** Invokes Redis Lua script to atomically reserve stock for 10 minutes.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "deal_id": "uuid",
    "variant_id": "uuid",
    "qty": 1
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "status": "RESERVED",
    "expires_at": "2024-10-25T10:10:00Z",
    "message": "Stock reserved for 10 minutes"
  }
  ```
- **Error Responses:** 
  - `409 Conflict`: `{ "error": "OUT_OF_STOCK" }`
  - `403 Forbidden`: `{ "error": "NOT_REGISTERED_FOR_DEAL" }`

### 3.2 Remove from Cart (Release Stock)
- **Endpoint:** `DELETE /api/cart/remove`
- **Request Body:** `{ "variant_id": "uuid", "deal_id": "uuid" }`
- **Response:** `200 OK` (Releases reservation in Redis and increments available stock)

---

## 4. Checkout & Payment APIs

### 4.1 Initiate Checkout
- **Endpoint:** `POST /api/checkout/initiate`
- **Description:** Validates active reservation and generates a payment gateway order.
- **Request Body:**
  ```json
  {
    "address_id": "uuid",
    "cart_items": [{ "variant_id": "uuid", "qty": 1 }]
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "order_id": "uuid",
    "pg_order_id": "razorpay_order_abc",
    "amount_to_pay": 4999.00
  }
  ```

### 4.2 Verify Payment Webhook
- **Endpoint:** `POST /api/webhooks/payment`
- **Description:** Webhook endpoint for Razorpay/Stripe to confirm payment success.
- **Action:** Moves order to `PAID`, permanently deducts stock in Postgres DB, clears Redis reservation.

---

## 5. WebSocket Events (Live Updates)

**Connection URL:** `wss://api.flasherp.com/ws/deals/{dealId}`

### 5.1 Server-to-Client Messages
- **`STOCK_UPDATE`**: Broadcast every second if stock changes.
  ```json
  {
    "event": "STOCK_UPDATE",
    "data": { "variant_id": "uuid", "available_qty": 45, "reserved_qty": 5 }
  }
  ```
- **`VIEWER_COUNT`**: Broadcasts the number of live users watching the deal.
- **`RESERVATION_EXPIRING_SOON`**: Sent uniquely to a user when 2 minutes remain on their cart.
- **`RESERVATION_EXPIRED`**: Sent when the TTL hits zero, clearing the user's frontend cart.

### 5.2 Client-to-Server Messages
- **`PING`**: Client heartbeat to maintain connection.
