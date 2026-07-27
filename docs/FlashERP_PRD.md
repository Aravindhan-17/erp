# Product Requirements Document (PRD)
## FlashERP — Smart ERP with a Real-Time Flash Deal Engine

**Version:** 3.0 (Production-Grade Specification)
**Status:** Approved Specification
**Owner:** Engineering & Product Leadership

---

## 1. Executive Summary

FlashERP is a **B2C (Business-to-Consumer)** SaaS platform designed for a **single vendor** (single merchant/store owner) that combines a traditional single-vendor ERP (inventory, orders, purchasing, finance, CRM) with a **real-time flash-deal engine**. It lets the vendor run time-boxed, urgency-driven sales — similar to Amazon Lightning Deals or Temu flash sales — directly from a single unified system to sell products directly to individual retail end-customers (single customer model).

The core mechanic: B2C customers pay a small refundable-in-spirit registration fee (e.g. ₹1) to become eligible for a deal, then reserve products in a time-limited cart window (e.g. 10 minutes) before checkout. This discourages bots/no-shows, prevents inventory hoarding, and creates genuine urgency, while giving the single vendor a single system of record for operations.

---

## 2. Problem Statement

Single-vendor B2C retailers and distributors (electronics, mobile, fashion, grocery, FMCG, pharmacy, hardware) currently need to stitch together separate tools for:

- Single-vendor inventory and order management (ERP)
- Time-limited promotional sales (typically only available on large multi-vendor marketplaces)
- Direct B2C customer engagement and finance reporting

There is no affordable, self-serve platform that lets a single B2C vendor run its own flash sales with real-time stock reservation, fraud protection, and full ERP backing for its end-customers.

---

## 3. Goals & Objectives

| Goal | Description |
|---|---|
| Sales acceleration | Give businesses a built-in mechanism to drive urgency and clear inventory |
| Operational consolidation | Replace multiple disconnected tools with one ERP + deals platform |
| Abuse prevention | Registration fee + reservation windows reduce fake sign-ups and stock hoarding |
| Real-time experience | Live stock counts, live viewer counts, countdown timers via WebSockets |
| Monetization paths | Registration fees, premium access tiers, sponsored deals, subscription SaaS tiers |

### Non-Goals (for MVP)
- Full multi-currency / multi-country tax compliance beyond GST (India-first)
- AI-driven forecasting/pricing (long-term vision, not MVP)
- Native mobile apps (MVP is responsive web; mobile app is a later phase)

---

## 4. Target Users / Personas

1. **Single Vendor / Business Admin** — configures company, products, and flash deals; monitors sales dashboards.
2. **Warehouse/Inventory Manager** — manages stock in/out, transfers, low-stock alerts for the single vendor.
3. **Sales/Finance Manager** — tracks B2C orders, revenue, GST invoicing, P&L for the merchant.
4. **B2C Customer / Shopper** — individual consumer who registers, joins deals, reserves and purchases products.
5. **Super Admin (SaaS)** — manages platform operations and infrastructure (post-MVP).

---

## 5. Core Concept & User Flow

```
Customer
   │
   ▼
Register for Flash Deal
   │
Pay ₹1 Registration Fee
   │
Eligible for Deal
   │
Countdown Begins
   │
Flash Deal Starts
   │
Browse Deal Products
   │
Add Product to Cart (stock reserved)
   │
10-Minute Reservation Window
   │
Checkout & Payment
   │
Order Confirmed / Stock Deducted
```

If payment is not completed within the reservation window, the hold is released automatically and stock returns to the available pool.

---

## 6. Functional Requirements by Module

### 6.1 Authentication & User Management
- Customer registration, login, OTP verification, password reset
- Admin/employee login with roles: Sales Manager, Warehouse Manager, Finance Manager, Marketing Manager
- Role-Based Access Control (RBAC) with configurable permissions
- Session management, refresh tokens, audit logs

### 6.2 Company / ERP Setup
- Company profile (name, GST, PAN, logo), multiple branches and warehouses
- Tax configuration (GST/CGST/SGST/IGST), currency, language settings

### 6.3 Product Management
- Categories (unlimited nesting), brands, products, variants (SKU, price, cost, stock, barcode)
- Product images/video, specifications, HSN code, warranty info
- Flash-specific fields: flash price, max quantity per deal

### 6.4 Inventory Management
- Stock in/out, transfers between warehouses, adjustments, damaged-goods tracking
- Real-time split of **Reserved Stock** vs **Available Stock**
- Low-stock alerts, dead-stock and fast-moving reports, stock valuation

### 6.5 Supplier & Vendor Management (Single Vendor Model)
- Single-vendor sourcing model: primary supplier profiles, purchase orders, goods received, invoice upload, supplier payments and returns for stock replenishment into the vendor's ERP

### 6.6 Customer Management (CRM - B2C Single Customer Model)
- B2C direct customer profile model: individual shopper profile, address book, wallet, order history, reward points/coupons, support tickets (tailored for direct B2C retail consumers, excluding multi-account corporate B2B client structures)
- Analytics: B2C customer lifetime value, average order value, shopper retention

### 6.7 Flash Deal Engine (Core USP)
**Deal configuration:**
- Deal name, banner, start/end time, registration start/end, registration fee
- Products in deal, flash price, max quantity/value per customer, total stock
- Branch/warehouse scope, max participants, reservation duration, cancellation/refund rules

**Registration:**
- Only paid, registered users are eligible to purchase during the deal
- Fee acts as a demand-forecasting signal and anti-bot filter

**Reservation engine:**
- Adding an item to cart immediately reserves stock (`Available -= qty`, `Reserved += qty`)
- Reservation backed by a cache-based timer (e.g. 10-minute TTL)
- On successful payment: stock is permanently deducted
- On timeout/cancel: reservation is released and stock automatically returns

**Anti-abuse:**
- One account per mobile/email, device fingerprinting, IP rate limiting, CAPTCHA under load, bot detection, per-customer quantity/value caps

**Admin visibility:**
- Live registrations, current revenue, products sold, pending payments, reserved vs. remaining stock, checkout success rate, countdown timer

### 6.8 Shopping Cart
- Live reservation countdown, coupon support, GST calculation, shipping charges
- Real-time inventory/price re-validation, wallet usage, saved checkout

### 6.9 Checkout & Payments
- Payment methods: UPI, cards, net banking, wallet, EMI (via Razorpay/PhonePe/Cashfree; Stripe for international)
- Checkout sequence: validate reservation → validate stock → calculate tax → process payment → generate invoice → confirm order → send notifications

### 6.10 Order Management
- Order lifecycle: Pending → Paid → Processing → Packed → Shipped → Delivered
- Returns, cancellations, refunds, shipment tracking

### 6.11 Finance & Accounting
- General/sales/purchase ledgers, cash book, bank book, expense tracking
- P&L, balance sheet, GST reports, registration-fee revenue, per-deal profitability

### 6.12 Notifications
- Channels: email, SMS, WhatsApp, push, in-app
- Trigger events: registration confirmed, deal starting soon, reservation expiring, payment success, order shipped, deal completed

### 6.13 Analytics & Business Intelligence
- Real-time sales and live deal participation dashboards
- Conversion rate (registered vs. purchased), average checkout time, revenue per deal
- Top products, inventory turnover, CAC, repeat customer rate

### 6.14 Super Admin (SaaS layer — post-MVP)
- Tenant onboarding, subscription plans, trial management, billing, feature flags, custom branding, tenant isolation, usage analytics

---

## 7. Additional Monetization Features (Post-MVP)
- **Premium Early Access** — paid subscription for entering deals a few minutes early
- **VIP Membership** — free registrations, exclusive deals, priority checkout
- **Referral Rewards** — wallet credits for invites
- **Sponsored Deals** — brands pay for homepage placement
- **Advertising Banners** — promotional placements during live sales

---

## 8. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Concurrency | Must support thousands of simultaneous users joining a single deal without overselling |
| Consistency | Atomic, transactional inventory updates (no race conditions on stock decrement) |
| Real-time | WebSocket broadcasting for live stock counts, viewer counts, and countdowns |
| Reliability | Automatic reservation expiry and stock release even under partial failures |
| Scalability | Queue-based order processing to smooth traffic spikes at deal start |
| Reporting | Read replicas to isolate reporting load from transactional traffic |
| Performance | CDN-served product images/banners; sub-second page loads under peak load |
| Security | Rate limiting, CAPTCHA/device fingerprinting, RBAC, audit logging |

---

## 9. Proposed Technical Architecture

```
                Customers
                    │
          Mobile App / Website
                    │
       ---------------------------
       |                         |
  Customer APIs             Admin APIs
       |                         |
   Authentication Service
       |
   -----------------------------
   |          |                |
Inventory  Flash Engine     ERP Engine
   |          |                |
Payment   Reservation      Finance
Notification Service
       |
   MySQL + Redis
       |
Object Storage (Images)
```

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router, SSR/ISR, React, TypeScript) |
| Backend | NestJS (Fastify Adapter, TypeScript) |
| Database | PostgreSQL 16 (ACID-compliant transactional store) |
| Cache / Reservations | Redis 7 (Atomic Lua scripts, TTL-based cart holds, WebSockets Pub/Sub) |
| Queue | BullMQ (Asynchronous checkout queue & job processing) |
| Storage | AWS S3 / Cloudflare R2 (Product images & GST invoices) |
| Payments | Razorpay, PhonePe, Cashfree, Stripe |
| Infrastructure | Docker, Docker Compose, Nginx, GitHub Actions CI/CD |

### 9.2 Scalability Approach
- Redis-based stock reservation with automatic TTL expiry
- Atomic inventory decrement operations to prevent overselling
- Queue-based order processing (BullMQ) to absorb bursty demand at deal start
- WebSocket broadcast layer for live countdowns/stock/viewer counts
- Read replicas for dashboards/reporting
- CDN for static assets

---

## 10. Data Model & Engine Specifications

### 10.1 Key Database Entities (PostgreSQL)
`Users`, `UserAddresses`, `Roles`, `Permissions`, `RolePermissions`, `UserSessions`, `OTP`, `RefreshTokens`, `SingleVendorCompany`, `Branch`, `Warehouse`, `Tax`, `Currency`, `Products`, `ProductVariants`, `ProductImages`, `Categories`, `Brands`, `Specifications`, `Attributes`, `Inventory`, `InventoryHistory`, `StockTransfer`, `Adjustment`, `WarehouseStock`, `Suppliers`, `PurchaseOrders`, `PurchaseItems`, `SupplierPayments`, `B2CCustomers`, `Orders`, `OrderItems`, `Payments`, `FlashDeals`, `FlashDealProducts`, `FlashDealRegistrations`, `FlashReservations`, `Cart`, `CartItems`, `Coupons`, `Notifications`, `Invoices`, `Wallet`, `Transactions`, `AuditLogs`

### 10.2 Redis Lua Script Engine (Atomic Reservation & Expiry)

To guarantee zero overselling under high concurrency (e.g. 10,000 requests/sec), stock reservation is executed atomically in Redis via Lua scripts:

#### Lua Script 1: Reserve Stock (`reserve_stock.lua`)
```lua
-- KEYS[1]: stock_key (e.g. "deal:101:variant:505:stock")
-- KEYS[2]: reservation_key (e.g. "reservation:user:88:deal:101")
-- ARGV[1]: requested_qty (e.g. 1)
-- ARGV[2]: ttl_seconds (e.g. 600)
-- ARGV[3]: user_id

local available = tonumber(redis.call('GET', KEYS[1]) or '-1')
if available < tonumber(ARGV[1]) then
    return {0, "OUT_OF_STOCK"}
end

-- Check if user already holds an active reservation
if redis.call('EXISTS', KEYS[2]) == 1 then
    return {0, "ALREADY_RESERVED"}
end

-- Atomically decrement available stock
redis.call('DECRBY', KEYS[1], ARGV[1])

-- Set reservation record with TTL (10 minutes)
redis.call('SETEX', KEYS[2], ARGV[2], ARGV[1])

return {1, "RESERVED_SUCCESSFULLY"}
```

#### Lua Script 2: Release Stock Expiry Listener (`release_stock.lua`)
```lua
-- Triggered when a reservation TTL expires or user cancels cart item
-- KEYS[1]: stock_key (e.g. "deal:101:variant:505:stock")
-- ARGV[1]: qty_to_release (e.g. 1)

redis.call('INCRBY', KEYS[1], ARGV[1])
return 1
```

---

## 11. Success Metrics (KPIs)

- Deal conversion rate (registered → purchased)
- Checkout success rate within the reservation window
- Reservation-to-payment latency (average checkout time)
- Overselling incidents (target: zero)
- Registration-fee revenue and per-deal profitability
- Customer acquisition cost and repeat-purchase rate
- System uptime during live flash-deal windows

---

## 12. Roadmap

### 12.1 Phased Delivery Plan

| Phase | Focus |
|---|---|
| 1 | Authentication & User Management (JWT, RBAC, sessions, audit logs) |
| 2 | Company / ERP Setup (branches, warehouses, tax, currency) |
| 3 | Product Management (categories, brands, variants, images) |
| 4 | Inventory Management (stock in/out, transfers, alerts, reports) |
| 5 | Supplier Management (POs, goods received, invoices, payments) |
| 6 | Customer Management / CRM |
| 7 | **Flash Deal Engine** (registration, reservation, anti-abuse, live dashboard) |
| 8 | Shopping Cart (live timers, coupons, GST, wallet) |
| 9 | Checkout & Payments (multi-gateway, invoice generation) |
| 10 | Order Management (lifecycle, returns, refunds, tracking) |
| 11 | Finance & Accounting (ledgers, P&L, GST reports) |
| 12 | Notifications (email/SMS/WhatsApp/push) |
| 13 | Analytics & BI dashboards |
| 14 | Super Admin / SaaS layer (multi-tenancy, billing, feature flags) |

### 12.2 Suggested Sprint Plan (~25 weeks)

| Sprint | Duration | Focus |
|---|---|---|
| 1 | 2 weeks | Authentication, RBAC, company setup |
| 2 | 3 weeks | Product catalog, categories, inventory foundation |
| 3 | 2 weeks | Suppliers, purchase orders, warehouse management |
| 4 | 3 weeks | Customer portal, shopping cart, checkout |
| 5 | 4 weeks | Flash Deal Engine: registration, reservation, timers |
| 6 | 2 weeks | Order management, invoicing, notifications |
| 7 | 2 weeks | Finance, reports, dashboards |
| 8 | 3 weeks | SaaS features: subscriptions, tenant management |
| 9 | 2 weeks | Performance tuning, security hardening, load testing |
| 10 | 2 weeks | UAT, production deployment, documentation |

### 12.3 Long-Term Vision (Post-MVP)
- AI demand forecasting for upcoming flash deals
- AI-recommended dynamic pricing based on inventory/sales trends
- AI-driven inventory replenishment suggestions
- AI customer segmentation and personalized offers
- AI support chatbot
- AI fraud detection for registrations and orders
- AI-generated executive insights/dashboards

---

## 13. Assumptions & Dependencies

**Assumptions**
- India is the primary launch market (GST, INR, UPI-first payment behavior)
- Onboarding businesses have product data digitized or are willing to bulk-import it
- Redis and MySQL are hosted in the same region to keep reservation-lock latency low
- Customers have a mobile number available for OTP verification
- A ₹1 registration fee is low enough to avoid meaningful payment-gateway decline/friction rates

**Dependencies**
- Sandbox and production API access for payment gateways (Razorpay/PhonePe/Cashfree/Stripe)
- An SMS/WhatsApp Business API provider for OTP and notifications
- Cloud object storage (S3/MinIO) provisioned ahead of Product Management (Phase 3)
- GST/tax rules finalized with finance/legal ahead of Checkout (Phase 9)
- Redis sized/cluster-tested for peak concurrent reservation load ahead of the Flash Deal Engine (Phase 7)

## 14. Compliance, Security & Data Privacy

- Payment data should never touch app servers directly — use gateway-hosted tokenization / PCI-DSS-compliant checkout (Razorpay/Cashfree/Stripe hosted fields), not raw card capture
- Customer PII (name, address, phone, optional KYC) handled per India's Digital Personal Data Protection (DPDP) Act 2023: consent capture at registration, a stated retention period, and a right-to-erasure workflow
- GST-compliant invoicing (HSN codes, CGST/SGST/IGST split) on every completed order
- Audit logs kept immutable and retained for a defined period (e.g. 1 year) to support dispute resolution on reservations/payments
- Rate limiting, CAPTCHA, and device fingerprinting specifically on registration and cart-reservation endpoints — the highest-abuse surface
- Encryption at rest for wallet balances and stored payment tokens; TLS everywhere in transit

**Open legal item:** whether the ₹1 registration fee counts as a "sale" for GST purposes, and whether it must be refundable under Indian consumer-protection rules if a customer doesn't get a deal slot.

## 15. Acceptance Criteria — Key Scenarios

**Flash deal registration**
- Given a deal in its registration window, when a customer pays the registration fee, then they are marked eligible and receive a confirmation notification.
- Given a customer already registered for a deal, when they attempt to register again, then the system blocks the duplicate for that account/device.

**Stock reservation**
- Given available stock > 0 during an active deal, when a customer adds a product to cart, then reserved stock increments and available stock decrements atomically, with no possibility of two customers reserving the same unit.
- Given a reservation not converted to payment before the window closes, when the timer expires, then the reserved stock is released back to available stock within seconds.

**Checkout**
- Given an active reservation, when payment succeeds, then stock is permanently deducted, an invoice is generated, and the order moves to "Paid".
- Given a payment failure or timeout, when the reservation window has not yet expired, then the customer can retry payment without losing their reservation.

**Admin dashboard**
- Given a live deal, when an admin views the dashboard, then live registrations, reserved/available stock, and revenue update in near real time via WebSocket, without a page refresh.

*(Representative sample — full acceptance criteria should be written per user story during sprint planning.)*

## 16. Edge Cases & Error Handling

- Deal end-time is reached while a customer still holds an active, unexpired reservation → honor the reservation through checkout, but block any new cart additions.
- A payment gateway callback is delayed or lost → a reconciliation job checks gateway status before releasing a reservation, so a customer who actually paid doesn't lose their stock.
- Registration payment succeeds but the registration record fails to write → an idempotent handler reconciles the record from the payment webhook.
- Two customers try to reserve the last unit at the same instant → an atomic Redis operation (e.g. a Lua-scripted decrement) ensures only one succeeds; the other immediately sees "out of stock."
- A deal is cancelled by the admin after registrations opened → registration fees are refunded automatically and customers are notified.
- A refund/return after a flash-deal purchase → the flash price (not the original list price) is used as the refund basis.

## 17. Launch & Rollout Plan

- **Internal alpha:** single test tenant, load-testing the reservation engine against the expected peak concurrent users at deal launch
- **Closed beta:** 2–3 pilot businesses across different verticals (e.g. mobile shop, grocery, fashion) running real flash deals with capped stock/participant limits
- **GA launch:** phased tenant onboarding with close monitoring, gradually lifting participant/stock caps as the reservation engine proves out at scale
- **Post-launch monitoring:** dashboards for reservation-failure rate, overselling incidents, checkout success rate, and payment-gateway error rate, reviewed after every major deal

## 18. Risks & Open Questions

| Risk | Mitigation |
|---|---|
| Overselling under high concurrency | Atomic Redis-based reservation + DB transaction guarantees |
| Bot/fake registrations gaming ₹1 fee | Device fingerprinting, rate limiting, CAPTCHA, one-account-per-identity rules |
| Payment gateway failure mid-checkout | Idempotent payment webhooks, reservation grace period, automatic retry/refund flow |
| Multi-tenant data isolation (SaaS phase) | Schema-level or row-level tenant isolation, tested in Phase 14 |
| Regulatory: registration fee treated as a transaction | Confirm compliance/tax treatment of the ₹1 fee with finance/legal before launch |

**Open questions for stakeholder input:**
1. Is India (GST-first) the only launch market, or should multi-currency be in MVP scope?
2. Should the registration fee be refundable/adjustable against final purchase, or purely non-refundable?
3. What's the minimum viable set of payment gateways for launch — Razorpay only, or multi-gateway from day one?

## 19. Glossary

| Term | Meaning |
|---|---|
| B2C | Business-to-Consumer retail transaction model |
| Single Vendor | Architecture where one merchant/seller operates the store and inventory system |
| B2C Customer | Individual retail end-consumer participating in flash deals |
| Flash Deal | A time-boxed promotional sale with limited stock and a paid registration gate |
| Reservation | A temporary hold on stock while a customer completes checkout |
| TTL (Time To Live) | The expiry duration of a Redis-held reservation |
| RBAC | Role-Based Access Control |
| Tenant | A business account on the SaaS platform (post-MVP multi-tenant phase) |

## 20. Document Control

| Version | Change |
|---|---|
| 1.0 | Initial PRD compiled from the project concept |
| 2.0 | Added assumptions/dependencies, compliance & data privacy, acceptance criteria, edge cases, launch plan, glossary |
| 2.1 | Updated architecture and scope to mandate a B2C single-vendor and single-customer model; added detailed [USER_STORIES.md](file:///home/hattussa-024/my-folder/react/erp/docs/USER_STORIES.md) |

**Sign-off required from:** Product, Engineering Lead, and Finance/Legal (registration-fee and data-privacy compliance) before Phase 1 kickoff.

---

*This PRD should be reviewed with engineering, finance, and legal before Phase 1 kickoff, particularly around payment/registration-fee compliance, PCI-DSS/DPDP data handling, and multi-tenant data isolation requirements. Detailed user stories with acceptance criteria are documented in [USER_STORIES.md](file:///home/hattussa-024/my-folder/react/erp/docs/USER_STORIES.md).*

