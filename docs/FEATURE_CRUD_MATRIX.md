# FlashERP Comprehensive Feature List (CRUD Matrix)

This document provides an exhaustive list of all modules and their corresponding CRUD (Create, Read, Update, Delete) and operational actions across the FlashERP platform. It is based on the architecture, source code mapping, and design specifications.

---

## 1. Admin Dashboard (Vendor & Internal Operations)

| Module / Feature Area | Key Entities | Available Actions (CRUD & Operations) |
| :--- | :--- | :--- |
| **Authentication & Security** | Admin User, Session | - **Read:** View Login Screen<br>- **Create:** Authenticate (Login) Session<br>- **Create:** Trigger Password Reset Email<br>- **Update:** Reset Password with Token<br>- **Delete:** Logout (Destroy Session) |
| **Product Catalog** | Product, Variant, Image | - **Create:** Add New Product (with Variants, Images, MRP, Flash Price)<br>- **Read:** View paginated Product List (Table with search/filters)<br>- **Read:** View detailed Product record<br>- **Update:** Edit Product details, prices, and stock allocation<br>- **Delete:** Soft Delete / Archive Product |
| **Category Management** | Category, Banner | - **Create:** Create new Category / Sub-Category (hierarchy)<br>- **Read:** View Category Tree / List<br>- **Update:** Edit Category Name, Parent, and promotional Banner<br>- **Delete:** Delete Category (if no products attached) |
| **Inventory & Stock** | Warehouse Stock, PO, GRN | - **Read:** View global stock levels across all SKUs<br>- **Read:** View Stock Movement History / Ledger<br>- **Create:** Inward Stock (Goods Receipt Note)<br>- **Update:** Manually adjust stock (+/-) for shrink/damage<br>- **Update:** Configure Low-Stock threshold alerts |
| **Flash Deals Engine** | Deal, Deal Item, Registration | - **Create:** Create New Flash Deal (Start/End times, Registration Fee)<br>- **Read:** View Upcoming, Live, and Ended Deals List<br>- **Read:** View specific Deal Details and assigned SKUs<br>- **Update:** Edit Deal Schedule or Item Pricing<br>- **Delete:** Cancel/Delete Upcoming Deal<br>- **Read:** View Customer Registrations for a Deal |
| **Order Management** | Order, Invoice, Tracking | - **Read:** View complete Orders List with current statuses<br>- **Read:** View specific Order Details (Items, Pricing, Customer)<br>- **Update:** Advance Order Status (`Pending` → `Processing` → `Shipped` → `Delivered`)<br>- **Update:** Add Shipping Tracking Number / Courier Info<br>- **Export:** Generate and Download PDF Tax Invoices |
| **Customer CRM** | Customer Profile, Wallet | - **Read:** View paginated Customer Directory<br>- **Read:** View Customer Profile (Order History, LTV, Address Book)<br>- **Read:** View Customer Wallet Ledger & Points<br>- **Update:** Suspend / Block Customer Account<br>- **Update:** Manually credit/debit Wallet (Admin Override) |
| **Returns & Support** | Ticket, Return Request | - **Read:** View pending Return Requests<br>- **Update:** Approve / Reject Return Request<br>- **Create:** Process Refund to Gateway or Wallet<br>- **Read:** View Support Tickets Queue<br>- **Update:** Reply to Ticket / Update Ticket Status (Open, Resolved) |
| **Live Monitor (Analytics)** | Dashboard, Sales Report | - **Read:** View Live Flash Sale Dashboard (WebSockets: Active Users, Carts)<br>- **Read:** View historical Sales & Profitability Reports<br>- **Export:** Export Sales / GST Tax data to CSV / PDF |
| **Global Settings** | Store Profile, Tax Rules | - **Read:** View Store Settings<br>- **Update:** Update Store Profile (Name, Logo, GSTIN, Default Currency)<br>- **Update:** Update Tax Configurations (CGST, SGST rules) |

---

## 2. B2C Storefront (Customer Journey)

| Module / Feature Area | Key Entities | Available Actions (CRUD & Operations) |
| :--- | :--- | :--- |
| **Account & Onboarding** | Customer, Session, OTP | - **Create:** Register New Account (Email/Phone + OTP)<br>- **Create:** Login (Verify OTP/Password)<br>- **Update:** Recover/Reset Password<br>- **Delete:** Logout (Destroy Session) |
| **Profile Management** | Personal Info, Avatar | - **Read:** View Profile Dashboard (Overview)<br>- **Update:** Edit Personal Details (Name, Phone, Preferences)<br>- **Update:** Upload / Change Avatar Image |
| **Address Book** | Shipping/Billing Address | - **Create:** Add New Address<br>- **Read:** View saved Addresses List<br>- **Update:** Edit existing Address Details<br>- **Update:** Set Address as Default for Checkout<br>- **Delete:** Remove Address |
| **Master Catalog Browsing**| Product, Category | - **Read:** View Homepage (Banners, Featured Categories)<br>- **Read:** View Category Listing (with Filters: Price, Brand)<br>- **Read:** View Single Product Detail Page (Images, Description, Price)<br>- **Read:** Search Products via Global Search |
| **Flash Deals Participation**| Deal, Registration | - **Read:** View "Upcoming" Flash Deals Schedule<br>- **Create:** Pay Registration Fee (e.g., ₹1) to become Eligible<br>- **Read:** View "Live" Flash Deals (Access gated by registration) |
| **Cart & Reservation** | Cart Item, Redis Lock | - **Create:** Add Product to Cart (Triggers 10-Min Redis Reservation Lock)<br>- **Read:** View Cart and Live Countdown Timer<br>- **Update:** Adjust Quantity (respecting per-customer caps)<br>- **Delete:** Remove Item from Cart (Releases Redis Lock) |
| **Checkout & Payments** | Checkout Session, Payment | - **Read:** View Order Summary (Taxes, Shipping, Subtotal)<br>- **Update:** Apply Coupon Code / Reward Points<br>- **Update:** Select Shipping Address<br>- **Create:** Process Payment (Razorpay / Stripe Gateway)<br>- **Create:** 1-Click Pay using Wallet Balance |
| **Wallet System** | Wallet Balance, Ledger | - **Read:** View Current Wallet Balance<br>- **Read:** View Wallet Transaction History (Credits/Debits)<br>- **Create:** Top-up Wallet Balance (Add Funds via Gateway) |
| **Orders & Tracking** | Order, Invoice | - **Read:** View Order History (List of all past/active orders)<br>- **Read:** View specific Order Status timeline<br>- **Export:** Download Order GST Invoice (PDF) |
| **Customer Service** | Return, Support Ticket | - **Create:** Submit Return Request (Select Items, Reason, Upload Photos)<br>- **Read:** View Status of active Return Requests<br>- **Create:** Open a new Support Ticket (Query / Complaint)<br>- **Read:** View Replies on Support Tickets |
| **Wishlist & Notifications** | Wishlist Item, Alerts | - **Create:** Add Product to Wishlist<br>- **Read:** View Wishlist<br>- **Delete:** Remove Product from Wishlist<br>- **Read:** View In-App Notifications (Deal Alerts, Order Updates)<br>- **Update:** Manage Notification Preferences (SMS, Email, Push) |

---

## 3. Background / Automated Systems (System Operations)

| Module / System | Trigger | Automated Action |
| :--- | :--- | :--- |
| **Cart Expiry Engine** | 10-Minute Redis TTL Expired | - Release reserved stock back to available pool.<br>- Notify UI via WebSocket to clear the user's cart. |
| **Flash Deal State Machine**| Server Clock (UTC) | - Transition Deal from `Upcoming` → `Live` at exact start time.<br>- Transition Deal from `Live` → `Ended` at exact end time. |
| **Notification Engine** | Deal Schedule | - Send SMS/Email/Push alerts to registered users exactly 15 minutes before Deal launch. |
| **Fraud Prevention** | High-velocity Requests | - Temporarily block IP address / Trigger CAPTCHA on Registration/Checkout. |
