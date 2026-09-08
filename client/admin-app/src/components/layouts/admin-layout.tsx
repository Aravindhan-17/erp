import { useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth.store";

import {
  LayoutDashboard,
  Zap,
  Activity,
  Package,
  Archive,
  ShoppingCart,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronRight,
  Menu,
  X,
  Tags,
  MessageSquare,
  Wallet,
} from "lucide-react";
import { ErpLogoWhite } from "../../assets/images";

export function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useAuthStore((s) => s.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", to: "/", icon: LayoutDashboard },
    { label: "Flash Deals", to: "/deals", icon: Zap },
    { label: "Live Deal Monitor", to: "/monitor", icon: Activity },
    { label: "Products", to: "/products", icon: Package },
    { label: "Categories", to: "/categories", icon: Tags },
    { label: "Inventory Management", to: "/inventory", icon: Archive },
    { label: "Orders", to: "/orders", icon: ShoppingCart },
    { label: "Registrations", to: "/registrations", icon: ClipboardList },
    { label: "Customers", to: "/customers", icon: Users },
    { label: "Customer Wallets", to: "/wallets", icon: Wallet },
    { label: "Support Tickets", to: "/tickets", icon: MessageSquare },
    { label: "Reports", to: "/reports", icon: BarChart3 },
  ];

  const isActive = (to: string) => {
    if (to === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(to);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="font-poppins min-h-screen bg-[#f8f8fc] text-gray-900">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="z-55 fixed inset-0 bg-black/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`z-60 w-67.5 bg-linear-to-b fixed left-0 top-0 flex h-screen flex-col from-[#24005f] via-[#27006d] to-[#16003e] text-white shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-18 flex shrink-0 items-center justify-between border-b border-white/10 px-6">
          <Link to="/" onClick={closeSidebar} className="flex items-center gap-3">
            <img src={ErpLogoWhite} alt="Main logo" className="object-contain transition duration-300 group-hover:scale-105" style={{ width: "220px", height: "auto" }} />
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-purple-200 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="hide-scrollbar flex-1 overflow-y-auto px-4 py-5">
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
                  className={`min-h-11.5 group flex items-center gap-3 rounded-xl px-4 py-3 text-[13.5px] font-medium transition-all duration-200 ${active ? "bg-primary text-white shadow-md" : "hover:bg-primary/50 text-purple-100 hover:text-white"
                    }`}
                >
                  <Icon size={19} strokeWidth={active ? 2.4 : 2} className={active ? "text-white" : "text-purple-200 group-hover:text-white"} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-7">
            <div className="mb-2 px-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-purple-300">System</span>
            </div>

            <Link
              to="/settings"
              onClick={closeSidebar}
              className={`min-h-11.5 group flex items-center gap-3 rounded-xl px-4 py-3 text-[13.5px] font-medium transition-all ${isActive("/settings") ? "bg-primary text-white shadow-md" : "hover:bg-primary/50 text-purple-100 hover:text-white"
                }`}
            >
              <Settings size={19} className="text-purple-200 group-hover:text-white" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
        <div className="shrink-0 border-t border-white/10 p-4">
          <button type="button" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[13.5px] font-medium text-purple-100 transition hover:bg-white/10 hover:text-white">
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:ml-67.5 min-h-screen">
        <header className="h-18 sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-5 md:px-7">
            <div className="flex min-w-0 items-center gap-3 md:gap-6">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 lg:hidden"
              >
                <Menu size={21} />
              </button>

              <div className="hidden items-center gap-2 text-sm sm:flex">
                <span className="font-medium text-gray-400">Admin ERP</span>
                <ChevronRight size={15} className="text-gray-300" />
                <span className="font-semibold text-gray-800">Dashboard</span>
              </div>

              <div className="w-75 lg:w-95 xl:w-105 hidden h-10 items-center gap-3 rounded-xl border border-gray-200 bg-white px-3.5 md:flex">
                <Search size={18} className="shrink-0 text-gray-400" />
                <input type="text" placeholder="Search deals, orders, products..." className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400" />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                <Bell size={19} />
                <span className="-right-0.75 h-4.5 min-w-4.5 absolute -top-1 flex items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                  5
                </span>
              </button>

              <button type="button" className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 sm:px-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eee9ff] text-[11px] font-bold text-[#5b21e8] uppercase">
                  {user?.email ? user.email[0] : "A"}
                </div>
                <span className="hidden text-sm font-semibold text-gray-800 md:block">
                  {user?.email ? user.email.split("@")[0] : "Admin"}
                </span>
              </button>


            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-72px)] px-4 py-5 sm:px-5 sm:py-6 md:px-7 md:py-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
