"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
} from "lucide-react";
import { ErpLogoWhite } from "@/assets/images";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Flash Deals",
      href: "/admin/deals",
      icon: Zap,
    },
    {
      label: "Live Deal Monitor",
      href: "/admin/monitor",
      icon: Activity,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Inventory Management",
      href: "/admin/inventory",
      icon: Archive,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Registrations",
      href: "/admin/registrations",
      icon: ClipboardList,
    },
    {
      label: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      label: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
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
          className="
            fixed
            inset-0
            z-55
            bg-black/50
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-60
          flex
          h-screen
          w-67.5
          flex-col
          bg-linear-to-b
          from-[#24005f]
          via-[#27006d]
          to-[#16003e]
          text-white
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out

          lg:translate-x-0
          
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" onClick={closeSidebar} className="flex items-center gap-3">
            <Image
              src={ErpLogoWhite}
              alt="Main logo"
              fill={false}
              width={220}
              height={220}
              className="object-contain transition duration-300 group-hover:scale-105"
            />
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-purple-200
              hover:bg-white/10
              hover:text-white
              lg:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="hide-scrollbar flex-1 overflow-y-auto px-4 py-5">
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`
                    group
                    flex
                    min-h-11.5
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-[13.5px]
                    font-medium
                    transition-all
                    duration-200

                    ${
                      active
                        ? `
                          bg-linear-to-r
                          from-[#7138f5]
                          to-[#5b20df]
                          text-white
                          shadow-[0_8px_25px_rgba(87,35,220,0.35)]
                        `
                        : `
                          text-purple-100
                          hover:bg-white/10
                          hover:text-white
                        `
                    }
                  `}
                >
                  <Icon
                    size={19}
                    strokeWidth={active ? 2.4 : 2}
                    className={active ? "text-white" : "text-purple-200 group-hover:text-white"}
                  />

                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ===================================================
              SYSTEM
          =================================================== */}
          <div className="mt-7">
            <div className="mb-2 px-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-purple-300">
                System
              </span>
            </div>

            <Link
              href="/admin/settings"
              onClick={closeSidebar}
              className={`
                group
                flex
                min-h-11.5
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-[13.5px]
                font-medium
                transition-all

                ${
                  isActive("/admin/settings")
                    ? "bg-white/10 text-white"
                    : "text-purple-100 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Settings size={19} className="text-purple-200 group-hover:text-white" />

              <span>Settings</span>
            </Link>
          </div>
        </div>
        <div className="shrink-0 border-t border-white/10 p-4">
          <button
            type="button"
            className="
              mb-1
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              text-[13.5px]
              font-medium
              text-red-300
              transition
              hover:bg-red-500/10
              hover:text-red-200
            "
          >
            <Zap size={19} />

            <span>Reset Platform Data</span>
          </button>

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              text-[13.5px]
              font-medium
              text-purple-100
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <LogOut size={19} />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:ml-67.5">

        <header
          className="
            sticky
            top-0
            z-40
            h-18
            border-b
            border-gray-200
            bg-white/95
            backdrop-blur-xl
          "
        >
          <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-5 md:px-7">

            <div className="flex min-w-0 items-center gap-3 md:gap-6">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-600
                  shadow-sm
                  hover:bg-gray-50
                  lg:hidden
                "
              >
                <Menu size={21} />
              </button>

              <div className="hidden items-center gap-2 text-sm sm:flex">
                <span className="font-medium text-gray-400">Admin ERP</span>

                <ChevronRight size={15} className="text-gray-300" />

                <span className="font-semibold text-gray-800">Dashboard</span>
              </div>

              <div
                className="
                  hidden
                  h-10
                  w-75
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-3.5
                  md:flex
                  lg:w-95
                  xl:w-105
                "
              >
                <Search size={18} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search deals, orders, products..."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    text-sm
                    text-gray-700
                    outline-none
                    placeholder:text-gray-400
                  "
                />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-500
                  hover:bg-gray-50
                "
              >
                <Bell size={19} />

                <span
                  className="
                    absolute
                    -right-0.75
                    -top-1
                    flex
                    h-4.5
                    min-w-4.5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  5
                </span>
              </button>

              <button
                type="button"
                className="
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-2
                  sm:px-3
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#eee9ff]
                    text-[11px]
                    font-bold
                    text-[#5b21e8]
                  "
                >
                  SK
                </div>

                <span className="hidden text-sm font-semibold text-gray-800 md:block">
                  Sanya K.
                </span>
              </button>

              <Link
                href="/"
                className="
                  hidden
                  h-10
                  items-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  text-xs
                  font-medium
                  text-gray-600
                  transition
                  hover:bg-gray-50
                  lg:flex
                  xl:px-5
                  xl:text-sm
                "
              >
                Customer site
              </Link>

              <div
                className="
                  hidden
                  h-10
                  items-center
                  rounded-xl
                  bg-linear-to-r
                  from-[#6631e8]
                  to-[#5120d3]
                  px-4
                  text-xs
                  font-semibold
                  text-white
                  shadow-[0_5px_15px_rgba(91,33,216,0.25)]
                  sm:flex
                  xl:px-5
                  xl:text-sm
                "
              >
                Admin ERP
              </div>
            </div>
          </div>
        </header>

        <main
          className="
            min-h-[calc(100vh-72px)]
            px-4
            py-5
            sm:px-5
            sm:py-6
            md:px-7
            md:py-7
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
