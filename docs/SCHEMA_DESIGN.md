# FlashERP Database Schema Design

This document details the relational database schema designed for the FlashERP system, as specified in the `FlashERP_PRD.md`. It uses PostgreSQL as the primary database.

The schema is divided into logical domains to better understand the relationships.

## 1. Core Authentication & Authorization

```mermaid
erDiagram
    Users ||--o{ UserAddresses : has
    Users ||--o{ UserSessions : has
    Users ||--o{ OTP : uses
    Users ||--o{ RefreshTokens : holds
    Users }|--|| Roles : assigned_to

    Roles ||--o{ RolePermissions : has
    Permissions ||--o{ RolePermissions : linked_to

    Users {
        uuid id PK
        string email UK
        string phone UK
        string password_hash
        string first_name
        string last_name
        boolean is_active
        timestamp created_at
    }

    Roles {
        int id PK
        string name UK "Admin, B2C_Customer, Warehouse_Manager, etc."
    }

    Permissions {
        int id PK
        string action "e.g., create_product, view_sales"
    }

    UserAddresses {
        uuid id PK
        uuid user_id FK
        string label "Home, Work"
        string street
        string city
        string state
        string zip_code
        string country
        boolean is_default
    }
```

## 2. Company & Organizational Settings

```mermaid
erDiagram
    SingleVendorCompany ||--o{ Branch : contains
    Branch ||--o{ Warehouse : operates
    SingleVendorCompany ||--o{ Tax : configures
    SingleVendorCompany ||--o{ Currency : uses

    SingleVendorCompany {
        int id PK
        string name
        string gst_number
        string pan_number
        string logo_url
    }

    Branch {
        int id PK
        int company_id FK
        string name
        string location
    }

    Warehouse {
        int id PK
        int branch_id FK
        string name
        string address
    }
```

## 3. Product Catalog

```mermaid
erDiagram
    Products ||--o{ ProductVariants : has
    Products ||--o{ ProductImages : contains
    Products ||--o{ Specifications : describes
    Products }|--|| Categories : belongs_to
    Products }|--|| Brands : manufactured_by
    ProductVariants ||--o{ Attributes : defines

    Categories {
        int id PK
        string name
        int parent_id FK
    }

    Products {
        uuid id PK
        string name
        string slug UK
        string description
        int category_id FK
        int brand_id FK
        string hsn_code
        boolean is_active
    }

    ProductVariants {
        uuid id PK
        uuid product_id FK
        string sku UK
        string barcode
        decimal base_price
        decimal cost_price
    }
```

## 4. Inventory Management

```mermaid
erDiagram
    ProductVariants ||--o{ WarehouseStock : stocked_in
    Warehouse ||--o{ WarehouseStock : holds
    WarehouseStock ||--o{ InventoryHistory : records
    Warehouse ||--o{ StockTransfer : source
    Warehouse ||--o{ StockTransfer : destination
    WarehouseStock ||--o{ Adjustment : undergoes

    WarehouseStock {
        uuid id PK
        uuid variant_id FK
        int warehouse_id FK
        int available_qty
        int reserved_qty
    }

    InventoryHistory {
        uuid id PK
        uuid stock_id FK
        string transaction_type "IN, OUT, RESERVE, RELEASE"
        int qty_change
        timestamp created_at
    }
```

## 5. Supplier & Purchasing

```mermaid
erDiagram
    Suppliers ||--o{ PurchaseOrders : receives
    PurchaseOrders ||--o{ PurchaseItems : contains
    PurchaseOrders ||--o{ SupplierPayments : paid_via
    ProductVariants ||--o{ PurchaseItems : requested

    Suppliers {
        int id PK
        string name
        string contact_email
        string contact_phone
        string gst_number
    }

    PurchaseOrders {
        uuid id PK
        int supplier_id FK
        int destination_warehouse_id FK
        string status "DRAFT, SENT, RECEIVED, CLOSED"
        decimal total_amount
    }
```

## 6. Flash Deals Engine

```mermaid
erDiagram
    FlashDeals ||--o{ FlashDealProducts : includes
    ProductVariants ||--o{ FlashDealProducts : offered_as
    FlashDeals ||--o{ FlashDealRegistrations : has
    Users ||--o{ FlashDealRegistrations : registers_for
    FlashDealRegistrations ||--|| FlashReservations : holds
    ProductVariants ||--o{ FlashReservations : reserves

    FlashDeals {
        uuid id PK
        string name
        timestamp registration_start
        timestamp registration_end
        decimal registration_fee
        timestamp deal_start
        timestamp deal_end
        int max_participants
    }

    FlashDealProducts {
        uuid id PK
        uuid deal_id FK
        uuid variant_id FK
        decimal flash_price
        int max_qty_per_user
        int total_allocated_stock
    }

    FlashDealRegistrations {
        uuid id PK
        uuid deal_id FK
        uuid user_id FK
        string payment_status "PENDING, PAID, REFUNDED"
        timestamp registered_at
    }

    FlashReservations {
        uuid id PK
        uuid registration_id FK
        uuid variant_id FK
        int qty_reserved
        timestamp expires_at
        string status "ACTIVE, EXPIRED, CONVERTED"
    }
```

## 7. B2C Orders & Checkout

```mermaid
erDiagram
    Users ||--o{ Cart : owns
    Cart ||--o{ CartItems : contains
    ProductVariants ||--o{ CartItems : item
    Users ||--o{ Orders : places
    Orders ||--o{ OrderItems : contains
    Orders ||--|| Payments : paid_by
    Orders ||--|| Invoices : billed_as
    ProductVariants ||--o{ OrderItems : bought

    Orders {
        uuid id PK
        uuid user_id FK
        decimal subtotal
        decimal tax_total
        decimal total_amount
        string status "PENDING, PAID, SHIPPED, DELIVERED, CANCELLED"
        uuid flash_deal_id FK "Nullable"
    }

    Payments {
        uuid id PK
        uuid order_id FK
        string gateway "Razorpay, Stripe, etc."
        string transaction_id
        string status "SUCCESS, FAILED, PENDING"
    }
```

## 8. Customer CRM, Wallet & Utility

```mermaid
erDiagram
    Users ||--|| B2CCustomers : extends
    Users ||--|| Wallet : owns
    Wallet ||--o{ Transactions : logs
    Users ||--o{ Notifications : receives
    Users ||--o{ AuditLogs : creates

    Wallet {
        uuid id PK
        uuid user_id FK
        decimal balance
    }

    Transactions {
        uuid id PK
        uuid wallet_id FK
        decimal amount
        string type "CREDIT, DEBIT"
        string description
    }
```

## Key Architectural Notes

1. **Atomic Inventory Control:** 
   The `WarehouseStock` entity splits `available_qty` and `reserved_qty`. When a flash deal item is added to the cart, the Redis reservation engine atomically increments `reserved_qty` and decrements `available_qty` to prevent database-level locks and overselling.
   
2. **Flash Deal Participation:** 
   Only users with a `PAID` `FlashDealRegistrations` record are allowed to create `FlashReservations` during the deal window. 

3. **Single Vendor Context:**
   Unlike multi-vendor schemas, `Products` and `Inventory` are tied globally to the `SingleVendorCompany` rather than having multiple merchant IDs. `Suppliers` act as sources for goods (B2B purchasing), and `Users` with `B2C_Customer` role represent the end consumers.
