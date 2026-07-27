# FlashERP System Architecture

This document visualizes the "Enterprise Event-Driven Stack" designed for FlashERP's B2C single-vendor model. It handles high-concurrency flash sales, atomic reservations, and real-time updates.

## System Architecture Diagram

```mermaid
graph TD
    %% Clients
    subgraph Clients [Clients - Web and Mobile]
        B2C[B2C Shoppers]
        Admin[Vendor Admin]
    end

    %% Edge / CDN
    CDN[Cloudflare CDN and WAF]

    %% Frontend App
    subgraph Frontend [Frontend Layer - Next.js 14]
        SF[B2C Storefront - SSR]
        ERP[Vendor ERP Dashboard - SPA]
    end

    %% Backend API
    subgraph Backend [Backend Layer - NestJS and Fastify]
        API[REST API Gateway]
        WS[WebSocket Server]
    end

    %% Message Queue
    subgraph Queue [Async Workers]
        BullMQ[BullMQ Job Queue]
        Workers[Background Workers]
    end

    %% Data Layer
    subgraph Data [Data Storage Layer]
        Redis[(Redis Cluster v7)]
        DB[(PostgreSQL 16)]
        S3[(AWS S3 or R2 Object Storage)]
    end

    %% External Services
    subgraph External [External Integrations]
        Pay[Payment Gateways - Razorpay or Stripe]
        SMS[Notifications - Twilio or WhatsApp]
    end

    %% Connections
    B2C -->|HTTPS and WSS| CDN
    Admin -->|HTTPS| CDN

    CDN --> Frontend

    SF -->|REST APIs| API
    SF -->|WebSockets| WS
    ERP -->|REST APIs| API

    API -->|Read and Write ERP Data| DB
    API -->|Atomic Lua Stock Hold| Redis
    API -->|Enqueue Checkout or Refund Jobs| BullMQ
    API -->|Upload Images or Invoices| S3

    WS -->|PubSub Live Updates| Redis

    BullMQ --> Workers
    Workers -->|DB Writes - Order Confirmation| DB
    Workers -->|Send Reminders or Alerts| SMS
    Workers -->|Verify Payment Webhooks| Pay

    %% Styling
    classDef client fill:#065f46,stroke:#34d399,stroke-width:2px,color:#ffffff;
    classDef front fill:#1e40af,stroke:#60a5fa,stroke-width:2px,color:#ffffff;
    classDef back fill:#881337,stroke:#fda4af,stroke-width:2px,color:#ffffff;
    classDef db fill:#78350f,stroke:#fde047,stroke-width:2px,color:#ffffff;
    classDef ext fill:#374151,stroke:#9ca3af,stroke-width:2px,color:#ffffff;

    class B2C,Admin client;
    class SF,ERP front;
    class API,WS,BullMQ,Workers back;
    class DB,Redis,S3 db;
    class Pay,SMS,CDN ext;
```

## Core Components Breakdown

1. **Frontend Layer (Next.js)**: 
   - **Storefront**: Utilizes Server-Side Rendering (SSR) for instant first contentful paint and SEO (crucial for sharing deal links). Connects to WebSockets for live countdown timers and stock drops.
   - **Vendor ERP**: A client-side Single Page Application (SPA) nested inside the Next.js app, offering a fast, app-like experience for warehouse and finance managers.

2. **Backend API (NestJS + Fastify)**: 
   - The modular core containing domains like Inventory, Orders, and Finance. Fastify ensures ultra-high throughput during the first minutes of a flash deal.

3. **In-Memory Engine (Redis)**: 
   - Uses atomic Lua scripts to manage the 10-minute cart reservations (hard stock holds) and prevents overselling without crashing the primary database with locks.

4. **Async Workers (BullMQ)**: 
   - Buffers the massive influx of checkout requests. Instead of 10,000 direct database writes per second, BullMQ throttles and processes orders reliably in the background.

5. **Primary Database (PostgreSQL)**: 
   - Maintains strict ACID compliance for financial ledgers, completed orders, purchase orders (POs), and GST tax calculations.
