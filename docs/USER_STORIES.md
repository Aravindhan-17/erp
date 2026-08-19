# User Stories — FlashERP (B2C Single-Vendor & Single-Customer Model)

**Version:** 2.0  
**Target Scope:** Comprehensive B2C Direct-to-Consumer Flash Sale ERP  

---

## Overview

This document contains detailed User Stories with Acceptance Criteria for FlashERP, built specifically around:
1. **Single Vendor Persona (Merchant / Store Owner / ERP Managers)** — Manages inventory, catalog, flash deals, orders, finance, ledgers, and fraud protection.
2. **B2C Customer Persona (Direct End-Shopper)** — Registers for flash sales, reserves stock in time-limited cart windows, purchases directly, manages wallet, and tracks orders.

---

## Epics Overview

- **EP01:** Vendor Store & ERP Operations
- **EP02:** Catalog Management & Flash Sale Engine
- **EP03:** Live Sales Monitoring & Order Processing
- **EP04:** B2C Customer Registration & Deal Eligibility
- **EP05:** Real-Time Cart Reservation & Anti-Hoarding
- **EP06:** B2C Checkout, Invoicing & Order Tracking
- **EP07:** Anti-Abuse, Rate Limiting & Fraud Prevention
- **EP08:** Finance, Ledger Accounting & GST Tax Compliance
- **EP09:** B2C Returns, Refunds & Customer Support
- **EP10:** Automated Multi-Channel Notifications
- **EP11:** Loyalty Rewards, Coupons & Wallet System

---

## 1. Single Vendor User Stories

### EP01: Vendor Store & ERP Operations

#### US1.1: Single-Vendor Store Profile Setup
- **As a** Single Vendor Admin,
- **I want to** configure my store details (GSTIN, store name, default currency, warehouse locations),
- **So that** all customer transactions and tax invoices correctly reflect my single-merchant business identity.

**Acceptance Criteria:**
- [x] Vendor can edit store profile, GSTIN, PAN, and uploaded brand logo.
- [x] Vendor can create and manage multiple warehouse locations mapped to their single-vendor account.
- [x] System validates GSTIN format and saves tax configuration rules (CGST/SGST/IGST).

#### US1.2: Supplier Inventory Purchasing & Stock Inwarding
- **As a** Warehouse Manager for the single vendor,
- **I want to** create purchase orders for external suppliers and inward received stock,
- **So that** stock counts are updated accurately in the vendor's central ERP database.

**Acceptance Criteria:**
- [x] Manager can record supplier profiles and generate Purchase Orders (POs).
- [x] Goods Receipt Note (GRN) entry increments available warehouse inventory atomically.
- [x] Supplier invoices can be uploaded and linked to supplier payment ledgers.

---

### EP02: Catalog Management & Flash Sale Engine

#### US2.1: Product & Flash Pricing Configuration
- **As a** Single Vendor Admin,
- **I want to** list products with standard retail prices and set special flash deal prices,
- **So that** I can run urgency-driven sales to clear stock or drive high-volume revenue.

**Acceptance Criteria:**
- [x] Admin can define product variants (SKU, color, size, list price, flash price, stock allocated).
- [x] Admin can assign maximum purchase limits per B2C customer for flash items (e.g. max 1 unit per customer).
- [x] Products can be assigned to multi-level categories and tagged for upcoming flash deals.

#### US2.2: Flash Deal Creation & Registration Gate Setup
- **As a** Single Vendor Admin,
- **I want to** schedule a flash deal with start/end times and a registration fee (e.g. ₹1),
- **So that** I can filter out bots/no-shows and gauge real demand before the sale begins.

**Acceptance Criteria:**
- [x] Admin sets deal name, banner, registration start/end time, deal start/end time, and registration fee amount.
- [x] System enforces that only customers who paid the registration fee can participate when the deal starts.
- [x] Admin can set maximum participant limits and reservation window TTL (e.g. 10 minutes).

---

### EP03: Live Sales Monitoring & Order Processing

#### US3.1: Real-Time Flash Sale Analytics Dashboard
- **As a** Single Vendor Admin,
- **I want to** view live WebSocket-driven metrics during an active flash deal,
- **So that** I can track real-time stock reservations, registration revenue, and checkout conversion rates.

**Acceptance Criteria:**
- [x] Dashboard updates reserved vs. available stock counts in real time without refreshing.
- [x] Live counters display active registrations, active cart holds, completed orders, and gross revenue.
- [x] System alerts vendor if checkout conversion rate drops or payment gateway error rates spike.

#### US3.2: B2C Order Fulfillment & Invoicing
- **As a** Sales & Finance Manager,
- **I want to** view completed B2C orders, generate GST tax invoices, and update fulfillment status,
- **So that** customers receive their orders promptly with legal tax documentation.

**Acceptance Criteria:**
- [x] Orders transition through `Pending` → `Paid` → `Processing` → `Packed` → `Shipped` → `Delivered`.
- [x] Automated GST tax invoice (PDF) generated upon payment confirmation showing HSN codes and breakdown.
- [x] Shipping tracking numbers can be assigned and emailed/SMSed to customers automatically.

---

### EP07: Anti-Abuse, Rate Limiting & Fraud Prevention

#### US7.1: Bot Protection & Dynamic Rate Limiting
- **As a** Single Vendor Security Admin,
- **I want to** enforce rate-limiting and device fingerprinting during flash deal registration and checkout,
- **So that** scalpers and automated bots cannot hoard flash inventory.

**Acceptance Criteria:**
- [x] System tracks device fingerprints and IP request rates on registration endpoints.
- [x] Dynamic CAPTCHA triggers automatically when request thresholds exceed normal traffic baselines.
- [x] Suspicious IP subnets are blocked from reserving stock.

#### US7.2: Per-Customer Quantity & Value Caps
- **As a** Single Vendor Admin,
- **I want to** strictly cap the maximum quantity and total value of flash items a single customer can reserve,
- **So that** flash deal products are distributed fairly among genuine retail buyers.

**Acceptance Criteria:**
- [x] Cart engine enforces single-item or specified maximum limit per customer account during flash deals.
- [x] System blocks duplicate reservations across multiple devices sharing the same customer identity.

---

### EP08: Finance, Ledger Accounting & GST Tax Compliance

#### US8.1: General & Sales Ledgers with Registration Revenue
- **As a** Finance Manager,
- **I want** registration fees (e.g. ₹1) and sales revenue automatically posted to general ledgers,
- **So that** per-deal profitability and total company revenue are calculated accurately.

**Acceptance Criteria:**
- [x] System creates separate accounting ledgers for Flash Registration Revenue and Product Sales.
- [x] Per-deal profit and loss (P&L) statements calculate net revenue minus product cost and gateway fees.

#### US8.2: Automated GST Compliance & Tax Reports
- **As a** Finance Manager,
- **I want to** export GST-compliant reports (GSTR-1, GSTR-3B formats) for all completed B2C orders,
- **So that** the vendor can file monthly tax returns without manual reconciliation.

**Acceptance Criteria:**
- [x] Reports group sales by CGST, SGST, IGST based on customer shipping state vs. vendor warehouse state.
- [x] Tax reports can be exported in CSV/JSON format for accountant upload.

---

## 2. B2C Customer User Stories

### EP04: B2C Customer Registration & Deal Eligibility

#### US4.1: B2C Shopper Account Creation & OTP Login
- **As a** B2C Shopper,
- **I want to** quickly sign up using my mobile number/email with OTP verification,
- **So that** I can create a secure single-user customer profile for flash deal access.

**Acceptance Criteria:**
- [x] Customer registers via mobile number with SMS OTP verification.
- [x] System creates a standard B2C customer profile with saved delivery addresses and a personal wallet.
- [x] Security checks restrict one account per verified mobile/email to prevent multi-account abuse.

#### US4.2: Flash Sale Registration & ₹1 Fee Payment
- **As a** B2C Shopper,
- **I want to** pay a small registration fee (e.g. ₹1) prior to a flash deal start,
- **So that** I secure my eligibility to participate in the time-limited deal.

**Acceptance Criteria:**
- [x] Customer views upcoming deals with countdown timers and clicks "Register Now".
- [x] Customer pays ₹1 via UPI/card/wallet; payment confirmation marks the profile as `Eligible`.
- [x] Customer receives an instant push/SMS confirmation notification with the deal start time.

---

### EP05: Real-Time Cart Reservation & Anti-Hoarding

#### US5.1: 10-Minute Cart Reservation Window
- **As an** Eligible B2C Shopper,
- **I want** stock to be reserved for me the moment I add a flash product to my cart,
- **So that** another customer cannot purchase it while I complete my checkout details.

**Acceptance Criteria:**
- [x] Adding product to cart invokes Redis Lua script `reserve_stock.lua` atomically in <20ms.
- [x] Stock reservation creates Redis key `reservation:user:{id}:deal:{id}` with 600s TTL.
- [x] Cart displays a prominent live countdown timer sync'd via WebSockets (`10:00` → `00:00`).
- [x] Quantity per customer is strictly capped at the vendor-defined limit (max 1 unit for flash items).

**Technical Implementation Notes:**
- **Redis Key:** `deal:{dealId}:variant:{variantId}:stock`
- **Error Response (Out of Stock):** `HTTP 409 Conflict` - `{ "code": "STOCK_EXHAUSTED", "message": "All flash units are currently reserved." }`

#### US5.2: Automatic Reservation Expiry & Stock Release
- **As a** B2C Shopper,
- **I want** clear warning alerts before my cart reservation expires,
- **So that** I know how much time remains, or understand why stock was released if I did not complete payment.

**Acceptance Criteria:**
- [x] Visual toast notification alerts the customer when `02:00` minutes remain on the reservation timer.
- [x] When Redis TTL expires (`keyevent@0:expired`), background listener executes `release_stock.lua` to return stock to available pool.
- [x] Client receives WebSocket event `RESERVATION_EXPIRED` to clear cart UI automatically.

---

### EP06: B2C Checkout, Invoicing & Order Tracking

#### US6.1: Direct B2C Checkout & Multi-Payment Processing
- **As a** B2C Shopper,
- **I want to** complete payment via UPI, Credit/Debit Card, Net Banking, or Wallet before the reservation timer expires,
- **So that** my flash order is confirmed and fulfilled.

**Acceptance Criteria:**
- [x] Checkout screen calculates item price, shipping fees, applied coupon discounts, and GST.
- [x] Customer can complete payment using Razorpay/PhonePe/Cashfree/Stripe integration.
- [x] Payment failure allows immediate retry within the remaining reservation time window.

#### US6.2: Invoice Access & Order Tracking
- **As a** B2C Shopper,
- **I want to** view my order status, download my GST invoice, and track shipment progress from my profile,
- **So that** I am informed of when my package will arrive.

**Acceptance Criteria:**
- [x] Customer receives instant order confirmation email and WhatsApp message upon successful payment.
- [x] Customer can view order status timeline and download GST tax invoice PDF from their account.
- [x] Customer can log support tickets or initiate returns within the vendor's return window.

---

### EP09: B2C Returns, Refunds & Customer Support

#### US9.1: Product Return Request & Wallet Refund
- **As a** B2C Shopper,
- **I want to** request a return for a defective or damaged product within the return policy window,
- **So that** I can get refunded to my store wallet or original payment method.

**Acceptance Criteria:**
- [x] Shopper can select delivered order items and select return reason with optional photo proof.
- [x] Vendor approval triggers automated store wallet credit or payment gateway refund based on the flash price paid.

#### US9.2: Customer Support Ticket System
- **As a** B2C Shopper,
- **I want to** submit support tickets regarding delivery delays or product queries,
- **So that** the vendor's support team can assist me.

**Acceptance Criteria:**
- [x] Customer can create tickets linked to specific order numbers.
- [x] Customer receives status notifications (Open → In Progress → Resolved) when support responds.

---

### EP10: Automated Multi-Channel Notifications

#### US10.1: Multi-Channel Deal Alerts
- **As a** B2C Shopper,
- **I want to** receive SMS, WhatsApp, and push notifications when registered deals are starting,
- **So that** I do not miss out on purchasing reserved flash items.

**Acceptance Criteria:**
- [x] System sends automated reminder 15 minutes before and at deal launch time.
- [x] Notification contains direct link to the live deal page.

---

### EP11: Loyalty Rewards, Coupons & Wallet System

#### US11.1: Customer Store Wallet & Reward Points
- **As a** B2C Shopper,
- **I want to** earn reward points on purchases and maintain a pre-funded store wallet balance,
- **So that** I can complete flash deal checkouts in 1 click without payment gateway delays.

**Acceptance Criteria:**
- [x] Shopper can top up wallet balance via UPI/card ahead of flash sales.
- [x] Wallet balance can be selected as 1-click payment option at checkout for instant order confirmation.
- [x] Reward points are earned on successful orders and can be redeemed for checkout discounts.

---

## 3. Module Implementation Timeline

The project features have been grouped into distinct modules, focusing purely on a single backend management system and a direct-to-consumer storefront.

| Module | Scope / Epics | Estimated Timeline |
|---|---|---|
| **Phase 0: UI/UX Design** | Design System, Wireframes & High-Fidelity Mockups for all Epics | Weeks 1 - 3 |
| **Module 1: Foundation & Backend Setup** | Store Profile (EP01) | Weeks 4 - 5 |
| **Module 2: Catalog & Inventory** | Catalog (EP02) | Weeks 6 - 8 |
| **Module 3: Supplier Management** | Inventory Inwarding (EP01) | Weeks 9 - 10 |
| **Module 4: Storefront & CRM (B2C)** | Customer Registration (EP04) | Weeks 11 - 12 |
| **Module 5: Flash Deal Engine (Core)** | Deal Engine (EP02), Cart Reservation (EP05), Anti-Abuse (EP07) | Weeks 13 - 16 |
| **Module 6: Checkout & Payments** | Checkout (EP06), Wallet (EP11) | Weeks 17 - 18 |
| **Module 7: Order Management & Invoicing** | Order Fulfillment (EP03), Returns/Support (EP09) | Weeks 19 - 20 |
| **Module 8: Finance & Notifications** | Finance/Ledgers (EP08), Notifications (EP10) | Weeks 21 - 22 |
| **Module 9: Analytics & Final Polish** | Live Analytics (EP03) | Weeks 23 - 25 |

---

## 4. Comprehensive User Story Mapping Matrix

| Epic | User Story | Primary Persona | Priority (MVP) |
|---|---|---|---|
| EP01 | US1.1: Single-Vendor Store Profile Setup | Vendor Admin | High |
| EP01 | US1.2: Supplier Inventory Purchasing & Stock Inwarding | Warehouse Manager | High |
| EP02 | US2.1: Product & Flash Pricing Configuration | Vendor Admin | High |
| EP02 | US2.2: Flash Deal Creation & Registration Gate Setup | Vendor Admin | High |
| EP03 | US3.1: Real-Time Flash Sale Analytics Dashboard | Vendor Admin | High |
| EP03 | US3.2: B2C Order Fulfillment & Invoicing | Sales/Finance Manager | High |
| EP04 | US4.1: B2C Shopper Account Creation & OTP Login | B2C Customer | High |
| EP04 | US4.2: Flash Sale Registration & ₹1 Fee Payment | B2C Customer | High |
| EP05 | US5.1: 10-Minute Cart Reservation Window | B2C Customer | High |
| EP05 | US5.2: Automatic Reservation Expiry & Stock Release | B2C Customer | High |
| EP06 | US6.1: Direct B2C Checkout & Multi-Payment Processing | B2C Customer | High |
| EP06 | US6.2: Invoice Access & Order Tracking | B2C Customer | High |
| EP07 | US7.1: Bot Protection & Dynamic Rate Limiting | Security Admin | High |
| EP07 | US7.2: Per-Customer Quantity & Value Caps | Vendor Admin | High |
| EP08 | US8.1: General & Sales Ledgers with Registration Revenue | Finance Manager | High |
| EP08 | US8.2: Automated GST Compliance & Tax Reports | Finance Manager | High |
| EP09 | US9.1: Product Return Request & Wallet Refund | B2C Customer | Medium |
| EP09 | US9.2: Customer Support Ticket System | B2C Customer | Medium |
| EP10 | US10.1: Multi-Channel Deal Alerts | B2C Customer | High |
| EP11 | US11.1: Customer Store Wallet & Reward Points | B2C Customer | High |
