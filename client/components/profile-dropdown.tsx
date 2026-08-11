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

export function ProfileDropdown({ isOpen, onClose, userName, userEmail = "user@example.com", userAvatar }: ProfileDropdownProps) {
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
      className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 z-50 flex flex-col overflow-hidden font-poppins"
    >
      {/* Header Profile Info */}
      <div className="flex items-center gap-3 border-b border-gray-100 p-4 bg-gray-50/50">
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
            <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-gray-900 truncate">{userName}</span>
          <span className="text-xs text-gray-500 truncate">{userEmail}</span>
        </div>
      </div>

      {/* Menu Links */}
      <div className="p-2 flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-gray-500 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                {item.label}
              </span>
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="p-2 border-t border-gray-100">
        <button 
          onClick={onClose}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group"
        >
          <LogOut size={18} className="text-red-500" />
          <span className="text-sm font-medium text-red-600">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
