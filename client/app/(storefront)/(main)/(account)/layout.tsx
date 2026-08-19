"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Package,
  LogOut,
  LayoutDashboard,
  Undo2,
  MapPin,
  Wallet,
  Heart,
  Bell,
  LifeBuoy,
} from "lucide-react";
import Image from "next/image";
import { UserAvatar } from "@/assets/images";

const navigation = [
  { name: "Overview", href: "/overview", icon: LayoutDashboard },
  { name: "Your Orders", href: "/orders", icon: Package },
  { name: "Returns & Cancellations", href: "/returns", icon: Undo2 },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Profile & Security", href: "/profile", icon: User },
  { name: "Address Book", href: "/addresses", icon: MapPin },
  { name: "Payment & Wallet", href: "/wallet", icon: Wallet },
  { name: "Notification Preferences", href: "/notifications", icon: Bell },
  { name: "Support Tickets", href: "/support", icon: LifeBuoy },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-10 md:px-8 xl:px-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full shrink-0 lg:w-64">
          <nav className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <div className="mb-6 flex items-center gap-3 px-2">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-gray-100">
                <Image
                  src={UserAvatar}
                  alt="User"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">John Doe</h2>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>

            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-primary" : "text-gray-400"} />
                  {item.name}
                </Link>
              );
            })}

            <hr className="my-2 border-gray-100" />

            <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
              <LogOut size={20} className="text-red-500" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
