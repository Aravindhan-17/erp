import Link from "next/link";
import { LayoutDashboard, Zap, Activity, Package, Archive, ShoppingCart, ClipboardList, Users, BarChart, Settings, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-poppins bg-gray-50 min-h-screen text-gray-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-4 md:px-8 xl:px-10">
          <div className="flex items-center gap-3">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-base font-bold text-white shadow-sm">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-gray-900 text-lg font-extrabold tracking-tight">
              Flash<span className="text-secondary">ERP</span>{" "}
              <span className="bg-primary/10 text-primary ml-2 rounded px-2 py-0.5 font-mono text-[10px] uppercase">
                Admin
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Redislua Active
            </span>
            <div className="bg-primary/10 text-primary border-primary/20 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold shadow-sm">
              VA
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-[1920px] px-4 py-8 md:px-8 xl:px-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* Sidebar Navigation (Premium Floating Card) */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 lg:sticky lg:top-24">
              <Link
                href="/admin"
                className="bg-primary/10 text-primary flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <LayoutDashboard size={20} className="text-primary" />
                Dashboard
              </Link>
              <Link
                href="/admin/deals"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <Zap size={20} className="text-gray-400" />
                Flash Deals
              </Link>
              <Link
                href="/admin/monitor"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <Activity size={20} className="text-gray-400" />
                Live Deal Monitor
              </Link>
              <Link
                href="/admin/products"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <Package size={20} className="text-gray-400" />
                Products
              </Link>
              <Link
                href="/admin/inventory"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <Archive size={20} className="text-gray-400" />
                Inventory Management
              </Link>
              <Link
                href="/admin/orders"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <ShoppingCart size={20} className="text-gray-400" />
                Orders
              </Link>
              <Link
                href="/admin/registrations"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <ClipboardList size={20} className="text-gray-400" />
                Registrations
              </Link>
              <Link
                href="/admin/customers"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <Users size={20} className="text-gray-400" />
                Customers
              </Link>
              <Link
                href="/admin/reports"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <BarChart size={20} className="text-gray-400" />
                Reports
              </Link>
              
              <div className="mt-2 mb-1 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                System
              </div>

              <Link
                href="/admin/settings"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <Settings size={20} className="text-gray-400" />
                Settings
              </Link>

              <hr className="my-2 border-gray-100" />

              <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 text-left w-full">
                <LogOut size={20} className="text-red-500" />
                Logout
              </button>
            </nav>
          </aside>

          {/* Dashboard Body */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
