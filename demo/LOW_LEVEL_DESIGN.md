# Low-Level Design

## 1. Runtime architecture

The demo is a static single-page application implemented with plain HTML, CSS and JavaScript. It uses a small in-memory domain model, deterministic render functions and delegated DOM events. Browser `localStorage` provides prototype persistence.

### Layers

1. **Domain data** — deals, products, orders, registrations, customers, addresses and activity.
2. **UI state** — active app, active customer/admin screen, cart, reservation end time, selected filters and edit targets.
3. **Render functions** — convert domain and UI state into screen-specific markup.
4. **Interaction handlers** — validate actions, mutate state, persist, then rerender affected views.
5. **Persistence** — serializes mutable collections and current navigation state.

## 2. Core entities

### Product

| Field | Purpose |
|---|---|
| `id`, `sku` | Stable identity |
| `name`, `category`, `img` | Catalog presentation |
| `mrp`, `price` | Pricing |
| `opening`, `sold`, `reserved` | Inventory calculation |
| `maxQty`, `alertAt` | Purchase and alert controls |

Available stock is calculated as `opening - sold - reserved`.

### Deal

| Field | Purpose |
|---|---|
| `id`, `title`, `subtitle`, `banner` | Campaign identity |
| `startsAt`, `endsAt`, `status` | Lifecycle |
| `fee` | Registration charge |
| `minValue`, `minQty` | Alternative checkout thresholds |
| `reserveMinutes` | Cart reservation duration |
| `maxQtyPerCustomer` | Deal-level quantity rule |
| `productIds` | Product membership |
| `registered`, `orders`, `revenue` | Operational metrics |

Deal status is recalculated from the clock. Draft is the only manually retained state.

### Registration

Contains registration ID, customer identity, deal, fee, payment status, access usage, timestamp and transaction reference. Customer access is also mirrored by `state.registered` for fast storefront checks.

### Order

Contains order identity, customer, deal, text summary, optional structured `lineItems`, value, payment, payment method, status, address and fulfillment timeline.

### Customer and Address

Customer records support ERP participation metrics. Addresses are customer-owned delivery locations with a single default flag.

## 3. Customer state machine

### Registration

`Review → Payment → Access granted`

Validation requires terms consent. Payment methods are simulated. Successful payment creates or updates a registration record and unlocks deal products.

### Cart reservation

`Empty → Reserved → Checkout or Expired`

Adding the first item assigns the cart to one deal and starts `reservationEndsAt`. Switching deals clears the existing prototype cart. When the timer reaches zero, items are released and the expiry modal is shown.

### Checkout

`Cart review → Address → Payment → Confirmation`

Checkout is enabled when either the minimum value or minimum item count is reached. Placing the order updates order data, deal metrics, product sold/reserved quantities, registration access usage and customer activity.

## 4. Admin operations

### Deal builder

Form fields update a live customer preview. Save validates dates and selected products, then creates or updates the deal. Duplicate creates a draft clone.

### Product and inventory

Product CRUD updates the master catalog. Inventory adjustment changes opening stock and alert threshold. All dependent customer/admin screens rerender.

### Fulfillment

The order detail modal exposes status transitions in admin mode. Updating status regenerates the demonstration fulfillment timeline and payment display where relevant.

### Participation CRM

Registration records and customer metrics are derived from shared domain collections. Filters and search are screen-local state. Exports generate CSV blobs in the browser.

## 5. Rendering and event strategy

- `$` and `$all` wrap DOM queries.
- `el()` converts markup strings to elements.
- Major screens have dedicated render functions.
- Dynamic table/card actions use document-level event delegation.
- Modal helpers toggle the shared `hidden` class.
- Navigation switches visible sections without page reload.
- The demo guide calls route-like scenario functions and can seed a valid checkout state.

## 6. Persistence and reset

`saveState()` serializes mutable domain arrays, registered deal IDs and UI location. `loadState()` restores these collections on startup. Admin reset removes the storage key and reloads the seeded application.

## 7. Responsive behavior

Desktop uses multi-column storefront grids, sticky side panels and a fixed admin sidebar. At tablet widths, complex layouts collapse to one or two columns. At mobile widths, the storefront navigation and app switch simplify, account pages stack, and the admin sidebar becomes an off-canvas panel.

## 8. Production integration seams

Replace the seeded arrays and mutation handlers with API calls while retaining the render contracts. Recommended service boundaries are Deal Service, Catalog Service, Inventory Service, Registration/Payment Service, Cart Reservation Service, Order Service, Customer Service and Notification Service. Server time and transactional inventory locks should replace client clock/state in production.
