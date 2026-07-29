import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/20 text-foreground flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="bg-background border-border hidden w-64 flex-col border-r md:flex">
        <div className="border-border flex h-16 items-center gap-2 border-b px-6">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-base font-bold text-white shadow">
            ⚡
          </div>
          <span className="text-primary text-lg font-extrabold tracking-tight">
            Flash<span className="text-secondary">ERP</span>{" "}
            <span className="bg-primary/10 text-primary ml-1 rounded px-2 py-0.5 font-mono text-[10px] uppercase">
              Admin
            </span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-4 text-sm font-semibold">
          <Link
            href="/admin"
            id="admin-nav-dashboard"
            className="bg-primary flex items-center gap-3 rounded-xl px-3 py-2.5 text-white shadow-sm"
          >
            📊 Live Dashboard
          </Link>
          <Link
            href="/admin/inventory"
            id="admin-nav-inventory"
            className="text-foreground/70 hover:bg-muted flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
          >
            📦 Inventory & POs
          </Link>
          <Link
            href="/admin/deals"
            id="admin-nav-deals"
            className="text-foreground/70 hover:bg-muted flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
          >
            🔥 Flash Deal Engine
          </Link>
          <Link
            href="/admin/orders"
            id="admin-nav-orders"
            className="text-foreground/70 hover:bg-muted flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
          >
            🛒 B2C Orders & Invoices
          </Link>
          <Link
            href="/admin/finance"
            id="admin-nav-finance"
            className="text-foreground/70 hover:bg-muted flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
          >
            📈 Ledgers & GST Reports
          </Link>
        </nav>

        <div className="border-border border-t p-4">
          <Link
            href="/"
            className="text-foreground/60 hover:text-primary flex items-center gap-2 text-xs font-bold transition-colors"
          >
            ← Back to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="bg-background border-border flex h-16 items-center justify-between border-b px-6">
          <h2 className="text-foreground text-base font-bold">Single Vendor Operations</h2>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Redislua Active
            </span>
            <div className="bg-primary/10 text-primary border-primary/20 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold">
              VA
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
