"use client";

import React, { useEffect, useRef } from "react";
import { User, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail?: string;
  userAvatar?: string | StaticImageData;
}

export function ProfileDropdown({
  isOpen,
  onClose,
  userName,
  userEmail = "user@example.com",
  userAvatar,
}: ProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
        return;
      }
      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: Package, label: "My Orders", href: "/orders" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div
      ref={dropdownRef}
      className="font-poppins absolute right-0 top-full z-50 mt-3 flex w-72 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
    >
      {/* Header Profile Info */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 p-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-200">
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt={userName}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center text-lg font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-bold text-gray-900">{userName}</span>
          <span className="truncate text-xs text-gray-500">{userEmail}</span>
        </div>
      </div>

      {/* Menu Links */}
      <div className="flex flex-col gap-1 p-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={onClose}
            className="group flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <item.icon
                size={18}
                className="group-hover:text-primary text-gray-500 transition-colors"
              />
              <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                {item.label}
              </span>
            </div>
            <ChevronRight
              size={16}
              className="text-gray-300 transition-colors group-hover:text-gray-400"
            />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-gray-100 p-2">
        <button
          onClick={onClose}
          className="group flex w-full items-center gap-3 rounded-xl p-3 transition-colors hover:bg-red-50"
        >
          <LogOut size={18} className="text-red-500" />
          <span className="text-sm font-medium text-red-600">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
