import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-muted/20 text-foreground">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
        <div className="h-16 px-6 flex items-center gap-2 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-base shadow">
            ⚡
          </div>
          <span className="font-extrabold text-lg tracking-tight text-primary">
            Flash<span className="text-secondary">ERP</span> <span className="text-[10px] uppercase bg-primary/10 text-primary px-2 py-0.5 rounded font-mono ml-1">Admin</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-sm font-semibold">
          <Link
            href="/admin"
            id="admin-nav-dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary text-white shadow-sm"
          >
            📊 Live Dashboard
          </Link>
          <Link
            href="/admin/inventory"
            id="admin-nav-inventory"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/70 hover:bg-muted transition-colors"
          >
            📦 Inventory & POs
          </Link>
          <Link
            href="/admin/deals"
            id="admin-nav-deals"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/70 hover:bg-muted transition-colors"
          >
            🔥 Flash Deal Engine
          </Link>
          <Link
            href="/admin/orders"
            id="admin-nav-orders"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/70 hover:bg-muted transition-colors"
          >
            🛒 B2C Orders & Invoices
          </Link>
          <Link
            href="/admin/finance"
            id="admin-nav-finance"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/70 hover:bg-muted transition-colors"
          >
            📈 Ledgers & GST Reports
          </Link>
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-foreground/60 hover:text-primary transition-colors"
          >
            ← Back to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-background border-b border-border px-6 flex items-center justify-between">
          <h2 className="font-bold text-base text-foreground">Single Vendor Operations</h2>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Redislua Active
            </span>
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20">
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
