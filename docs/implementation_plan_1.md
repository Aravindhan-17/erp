# Phase 0: Dependency & Module Audit

Before moving any files, here is the audit of the current `server/src` directory.

## 1. Existing Module Boundaries & Duplication
The codebase is currently split rigidly by role (`admin/` vs `customer/`), leading to significant domain duplication:

- **Auth**: Split into `admin/auth` and `customer/auth`. Both handle JWT strategies and login, but for different Prisma models (`AdminUser` vs `Customer`).
- **Products**: Split into `admin/products` (CRUD) and `customer/products` (Listing).
- **Users**: Split into `admin/users` and `customer/users` (mostly CRUD for the respective models).
- **Customers**: We have `admin/customers` (Admin viewing customer lists/wallets) and `customer/profile` (Customer viewing their own profile/address).
- **Categories**: Currently only exists in `admin/categories`.

## 2. Infrastructure & Cross-Cutting Concerns
- `shared/prisma`: Contains the PrismaService.
- `shared/filters`, `shared/interceptors`, `shared/utils`: Contains global HTTP filters and Swagger setup.
- `shared/health`: Contains the health check controller.
- `email`: Contains the Resend email service at the root level.

## 3. Current Import / Dependency Flow
Currently, feature modules directly import `PrismaModule` from `shared/prisma`. The global config (`ConfigModule.forRoot`) is handled in `app.module.ts`.

---

# Phase 1: Modular Monolith Execution Plan

**Goal:** Migrate to the `core/`, `common/`, `modules/` structure with **zero feature changes**. 
We will eliminate the `admin/` and `customer/` root folders, merging their files into unified domain folders, but we will *not* rewrite the business logic yet.

## Step 1: Scaffold Core & Common
1. Create `src/core/database`, `src/core/email`, and `src/core/health`.
2. Create `src/common/filters`, `src/common/interceptors`, and `src/common/utils`.
3. Move `shared/prisma/*` -> `core/database/`
4. Move `email/*` -> `core/email/`
5. Move `shared/health/*` -> `core/health/`
6. Move `shared/filters/*`, `shared/interceptors/*`, `shared/utils/*` -> `common/`
7. *Delete the empty `shared/` and `email/` root folders.*

## Step 2: Unify Domains (The `modules/` directory)
We will create `src/modules/` and move the role-based files into their respective domains without changing the code inside them (other than fixing import paths).

1. **`modules/auth/`**
   - Move all files from `admin/auth/*` and `customer/auth/*` here.
   - We will retain both `admin-auth.controller.ts` and `customer-auth.controller.ts` side-by-side for now to ensure zero feature breakage.
2. **`modules/products/`**
   - Move `admin/products/*` and `customer/products/*` here.
   - The module will have `admin-products.controller.ts` and `products.controller.ts` (customer).
3. **`modules/users/`**
   - Move `admin/users/*` and `customer/users/*` here.
4. **`modules/customers/`**
   - Move `admin/customers/*` and `customer/profile/*` here.
   - This unifies "admin customer management" and "customer self-profile" under the `Customers` domain.
5. **`modules/categories/`**
   - Move `admin/categories/*` here.

## Step 3: Module Registry Consolidation
1. Update `app.module.ts` to import the new core modules (`DatabaseModule`, `EmailModule`, `HealthModule`).
2. Consolidate the feature modules. Instead of importing `AdminProductsModule` and `CustomerProductsModule` separately, we will merge them into a single `ProductsModule` inside `modules/products/products.module.ts` that provides both controllers and services.
3. Apply this consolidation to `AuthModule`, `UsersModule`, and `CustomersModule`.
4. *Delete the empty `admin/` and `customer/` root folders.*

## Step 4: Verification
- Run `npm run typecheck` and `npm run build` to ensure all relative import paths were successfully updated and the NestJS DI container is intact.

---

## User Review Required

> [!IMPORTANT]
> This plan executes Phase 1 exactly as requested: **zero feature changes, purely structural**. It groups the currently duplicated role logic into unified domain folders, setting us up to slowly refactor the logic itself in Phase 2.
>
> If this audit and execution plan look correct, I am ready to begin running the `mv` commands and updating the `import` paths!
