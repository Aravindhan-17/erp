"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Settings, LogOut } from "lucide-react";

const navigation = [
  { name: "My Profile", href: "/profile", icon: User },
  { name: "My Orders", href: "/orders", icon: Package },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-10 md:px-8 xl:px-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-4 px-2 text-lg font-bold text-gray-900">My Account</h2>
            
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#F3380B1A] text-secondary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-secondary" : "text-gray-400"} />
                  {item.name}
                </Link>
              );
            })}
            
            <hr className="my-2 border-gray-100" />
            
            <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 text-left">
              <LogOut size={20} className="text-red-500" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
