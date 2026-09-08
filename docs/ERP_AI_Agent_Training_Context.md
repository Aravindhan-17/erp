# ERP Architecture & Phase 1 — AI Agent Context

## Project Goal
Build a production-oriented ERP system that demonstrates strong full-stack/backend architecture without premature overengineering.

## Core Architecture Decision
Use capability/domain-based backend modules, not top-level Admin/Customer backend modules.

### Frontends
- customer-web
- admin-web

### Backend
One NestJS backend organized by business capability:
- auth
- users
- customers
- products
- categories
- inventory
- flash-deals
- carts
- orders
- payments
- notifications

## Why Capability-Based Grouping?
- Admin and Customer are actors.
- Products, Orders, Payments, Inventory, etc. are business capabilities.
- Business logic should have one clear owner.
- Avoid duplicated admin/products and customer/products implementations.
- Avoid a giant AdminModule or CustomerModule.
- Capability boundaries make future microservice extraction easier.
- Different frontend screens do not automatically mean different backend domains.

## Authentication Exception
Admin and customer authentication remain separate inside the Auth capability because their workflows/models/lifecycles can genuinely differ.

Recommended Auth structure:

auth/
├── admin/
│   ├── dto/
│   ├── admin-auth.controller.ts
│   └── admin-auth.service.ts
├── customer/
│   ├── dto/
│   ├── customer-auth.controller.ts
│   └── customer-auth.service.ts
├── decorators/
│   └── roles.decorator.ts
├── guards/
│   ├── admin-jwt-auth.guard.ts
│   ├── admin-jwt-refresh.guard.ts
│   ├── customer-jwt-auth.guard.ts
│   ├── customer-jwt-refresh.guard.ts
│   └── roles.guard.ts
├── strategies/
│   ├── admin-jwt.strategy.ts
│   ├── admin-jwt-refresh.strategy.ts
│   ├── customer-jwt.strategy.ts
│   └── customer-jwt-refresh.strategy.ts
└── auth.module.ts

## Authorization Model
Authentication → RBAC/Permissions → Resource Ownership → Business Policies

## Phase 1 Philosophy
Phase 1 is a capability-boundary refactor, not a feature rewrite.

Rule:
Requirement → Problem → Complexity → Architectural mechanism

### Allowed
- File moves
- Folder restructuring
- Import changes
- NestJS module registration changes
- Naming cleanup
- .gitignore changes

### Not allowed
- New business logic
- Database redesign/schema changes
- API redesign
- Authentication behavior changes
- Redis
- RabbitMQ
- Worker infrastructure
- Outbox
- Idempotency infrastructure
- Full observability stack
- Premature clean-architecture abstractions
- Speculative future modules
- Broad performance changes

## Phase 1 Success Criteria
- App builds
- Unit tests pass
- E2E tests pass
- App boots
- Existing API endpoints remain unchanged
- Swagger endpoints remain unchanged
- Prisma schema/migrations remain unchanged
- Authentication behavior remains unchanged
- No heavy infrastructure added
- Modules are capability-oriented
- No generic others bucket
- No speculative future modules
- No behavior changes

If an architectural issue is discovered, document/defer it unless changing it is required for compilation.

## Phase 1 Execution

### 1A — Baseline
Before changes:
git status
npm run build
npm run test
npm run test:e2e

Record current routes, Swagger endpoints, Prisma dependencies, and existing working-tree changes.

### 1B — Inventory & Discovery
- Map every current file/module.
- Verify whether modules/others is actually empty.
- Define target boundaries.
- Only create modules that exist today.
- Do not create future modules solely for architecture.

### 1C — Core Infrastructure
Create:
src/core/config/swagger.ts

Move Swagger setup from:
src/common/utils/setup-swagger.ts

Update main.ts.
Do not over-engineer configuration.

### 1D — Auth Refactor
- Move admin DTOs/controllers/services into auth/admin/.
- Move customer DTOs/controllers/services into auth/customer/.
- Keep authentication guards and strategies under auth/guards and auth/strategies.
- Keep roles.decorator.ts and roles.guard.ts under Auth.
- Update all affected imports and NestJS module registrations.

### 1E — Verification
Run build, unit tests, E2E tests, app boot verification, API behavior verification, Swagger parity verification, and structural diff review.

Structural checks:
- Old file paths removed
- No empty others bucket
- No Prisma schema/migration changes
- No API behavior changes
- No authentication behavior changes

## API Versioning Decision
API versioning is recommended, but do NOT introduce /api/v1 during Phase 1 because Phase 1 must preserve existing API behavior.

After Phase 1, introduce:
- /api/v1/products
- /api/v1/orders
- /api/v1/payments
- /api/v1/auth/customer/sign-in
- /api/v1/auth/admin/sign-in

Version the API as a whole, not every module independently.

## Deferred Infrastructure
Do not add these without a concrete requirement:
- Redis/Valkey
- RabbitMQ
- Workers
- Outbox
- Idempotency
- OpenTelemetry
- Prometheus/Grafana/Loki/Tempo

Introduce them when justified:
- Slow async work → queue/worker
- Reliable DB+event publication → outbox
- High-frequency reads → Redis
- Concurrency-sensitive operations → DB transaction/locking
- Duplicate requests → idempotency
- Independent scaling/deployment/security boundary → separate service

## Important Rule
Do NOT create modules/admin/ and modules/customer/ as top-level owners of all business capabilities.

Prefer:
modules/products/
modules/orders/
modules/payments/
etc.

Admin/Customer access is controlled through authentication, authorization, ownership, and business policies.

## Current Backend State Before Phase 1
src/
├── common/
│   ├── filters/
│   ├── interceptors/
│   └── utils/
│       └── setup-swagger.ts
├── core/
│   ├── database/
│   ├── email/
│   └── health/
├── modules/
│   ├── auth/
│   │   ├── decorators/
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   ├── admin-auth.controller.ts
│   │   ├── admin-auth.service.ts
│   │   ├── customer-auth.controller.ts
│   │   ├── customer-auth.service.ts
│   │   └── auth.module.ts
│   └── others/
├── app.module.ts
└── main.ts

modules/others appeared empty and must be verified before deletion.

## AI Agent Operating Instructions
Act as a senior software architect/backend engineer.
- Preserve existing behavior during Phase 1.
- Do not invent requirements.
- Do not add future architecture without a concrete requirement.
- Prefer simple, cohesive, capability-oriented modules.
- Separate actors only where they represent genuinely different workflows/domains.
- Explain architectural changes using requirement → problem → complexity → mechanism.
- Treat this Phase 1 plan as the locked execution contract unless explicitly asked to revise it.
