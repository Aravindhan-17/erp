"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import type { StaticImageData } from "next/image";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface HeaderProps {
  logoSrc?: string | StaticImageData;
  logoAlt?: string;
  navLinks?: NavItem[];
  userName?: string;
  userAvatar?: string | StaticImageData;
  notificationCount?: number;
  cartCount?: number;
  onSearch?: (query: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Header({
  logoSrc = "/images/logos/erp-logo.svg",
  logoAlt = "ERP Flash Deal",
  navLinks = [
    { label: "Home", href: "/", active: true },
    { label: "Flash Deals", href: "/flash-deals" },
    { label: "Categories", href: "/categories" },
    { label: "How it Works", href: "/how-it-works" },
  ],
  userName = "John",
  userAvatar = "/images/users/user.png",
  notificationCount = 3,
  cartCount = 2,
  className = "",
  style,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      style={style}
      className={`relative z-50 mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between gap-4 bg-white px-4 md:px-8 xl:h-[88px] xl:px-10 ${className}`}
    >
      {/* 1. Left Section: Logo Container */}
      <Link href="/" className="flex shrink-0 items-center">
        {logoSrc && (
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={248}
            height={60}
            quality={100}
            className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-105 sm:h-12 xl:h-14"
            priority
          />
        )}
      </Link>

      {/* 2. Middle & Right Section Container */}
      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4 md:gap-6 xl:gap-8">
        {/* Navigation Layout Container (hidden on mobile/tablet) */}
        <nav className="hidden items-center gap-4 lg:flex xl:gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`whitespace-nowrap font-poppins text-sm font-semibold transition-all duration-150 xl:text-base ${
                (link.active ?? pathname === link.href)
                  ? "text-secondary"
                  : "text-foreground opacity-90 hover:text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar Container */}
        <div className="hidden h-10 flex-1 min-w-[120px] lg:min-w-[200px] max-w-[480px] items-center justify-between gap-2 rounded-lg bg-[#F6F6F6] px-4 md:flex xl:h-12">
          <input
            type="text"
            placeholder="Search for products, brands..."
            className="h-full w-full border-none bg-transparent font-poppins text-sm font-medium outline-none placeholder:opacity-50 xl:text-base"
          />
          <Search className="h-5 w-5 shrink-0 text-black/50" />
        </div>

        {/* Mobile Search Icon */}
        <button
          className="hidden p-2 text-black/50 md:hidden"
          aria-label="Search"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Icons Layout Container */}
        <div className="flex shrink-0 items-center gap-2 xl:gap-4">
          {/* Bell Icon */}
          <button
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-50 xl:h-12 xl:w-12"
          >
            <Bell className="h-6 w-6 stroke-2 text-black" />
            {notificationCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-red-600 text-[10px] font-bold text-white xl:right-1 xl:top-1 xl:h-5 xl:w-5 xl:text-xs">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Icon */}
          <button
            aria-label="Shopping Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-50 xl:h-12 xl:w-12"
          >
            <ShoppingCart className="h-6 w-6 stroke-2 text-black" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-red-600 text-[10px] font-bold text-white xl:right-1 xl:top-1 xl:h-5 xl:w-5 xl:text-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* User Profile Container */}
        <div className="group hidden shrink-0 cursor-pointer select-none items-center gap-2 sm:flex xl:gap-3">
          {/* Profile Image */}
          <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 xl:h-12 xl:w-12">
            {userAvatar && (
              <Image
                src={userAvatar}
                alt={userName}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Profile Text Layout */}
          <div className="hidden flex-col justify-center text-left xl:flex">
            <span className="font-poppins text-xs font-medium text-black/50 xl:text-sm">
              Hello, {userName}
            </span>
            <span className="font-poppins text-sm font-semibold text-black xl:text-base">
              My Account
            </span>
          </div>

          {/* Profile Chevron */}
          <ChevronDown className="hidden h-5 w-5 shrink-0 text-black transition-transform group-hover:translate-y-0.5 xl:block xl:h-6 xl:w-6" />
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="p-2 text-black lg:hidden"
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full flex-col border-t border-gray-100 bg-white px-4 py-6 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-4 font-sans">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-poppins py-2 text-lg font-semibold ${
                  (link.active ?? pathname === link.href)
                    ? "text-secondary"
                    : "text-foreground hover:text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-200">
                {userAvatar && (
                  <Image
                    src={userAvatar}
                    alt={userName}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <span className="font-poppins text-base font-medium text-black">
                Hello, {userName}
              </span>
            </div>

            {/* Mobile Search Bar inside menu */}
            <div className="mt-2 flex h-12 w-full items-center justify-between gap-2 rounded-lg bg-[#F6F6F6] px-3 md:hidden">
              <input
                type="text"
                placeholder="Search..."
                className="font-poppins h-full w-full border-none bg-transparent text-sm font-medium text-black outline-none placeholder:text-black/50"
              />
              <Search className="h-5 w-5 text-black/50" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
