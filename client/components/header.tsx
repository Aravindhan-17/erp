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
      className={`max-w-480 xl:h-38 relative mx-auto box-border flex min-h-20 w-full rotate-0 items-center justify-between bg-white px-4 py-4 opacity-100 transition-all duration-200 md:px-8 xl:px-10 xl:py-0 ${className}`}
    >
      {/* 1. Left Section: Logo Container */}
      <div className="flex shrink-0 items-center">
        <Link
          href="/"
          className="w-35 sm:w-45 md:w-50 xl:w-62 xl:h-15 group box-border flex h-auto rotate-0 items-center opacity-100"
        >
          {logoSrc && (
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={248}
              height={60}
              quality={100}
              className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
          )}
        </Link>
      </div>

      {/* 2. Right Section: Navigation & Action Content Container */}
      <div className="xl:h-18 ml-2 box-border flex min-h-12 max-w-full flex-1 rotate-0 items-center justify-end gap-3 opacity-100 sm:gap-4 md:ml-4 xl:ml-0 xl:gap-5">
        {/* Mobile Menu Icon (shown only on small screens) */}
        <button
          className="p-2 text-[#000000] xl:hidden"
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Navigation Layout Container */}
        <nav className="h-18 gap-3.75 2xl:gap-7.5 hidden w-auto max-w-full rotate-0 items-center font-sans opacity-100 xl:flex">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`h-18 pt-5.25 pb-5.25 font-poppins text-4 2xl:text-5 box-border flex rotate-0 items-center justify-center gap-2.5 font-semibold leading-none tracking-normal transition-all duration-150 ${
                (link.active ?? pathname === link.href)
                  ? "text-[#F3380B] opacity-100"
                  : "text-[#09090B] opacity-95 hover:text-[#F3380B]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar Container */}
        <div className="max-w-120.75 xl:h-18 rounded-2 box-border hidden h-10 flex-1 rotate-0 items-center justify-between gap-2 bg-[#F6F6F6] px-3 opacity-100 md:flex xl:gap-10 xl:p-5">
          <input
            type="text"
            placeholder="Search for products, brands, categories..."
            className="xl:h-6.75 font-poppins text-3.5 xl:text-4.5 h-full w-full border-none bg-transparent font-medium leading-none tracking-normal text-[#000000] placeholder-[#000000] opacity-50 outline-none placeholder:opacity-50"
          />
          <Search className="pointer-events-none h-5 w-5 shrink-0 rotate-0 text-[#000000] opacity-50 xl:h-8 xl:w-8" />
        </div>

        {/* Mobile Search Icon (shown only on small screens) */}
        <button
          className="p-2 text-[#000000] opacity-50 md:hidden"
          aria-label="Search"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Icons Layout Container */}
        <div className="xl:w-38.5 xl:h-18 box-border flex min-h-12 w-auto max-w-full rotate-0 items-center gap-1 opacity-100 sm:gap-2 xl:gap-2.5">
          {/* Bell Icon */}
          <button
            aria-label="Notifications"
            className="xl:w-18 xl:h-18 relative flex h-9 w-9 rotate-0 cursor-pointer items-center justify-center text-[#000000] opacity-100 sm:h-12 sm:w-12"
          >
            <div className="xl:left-4.5 xl:h-14.5 pointer-events-none relative flex h-full w-full rotate-0 items-center justify-center opacity-100 xl:absolute xl:top-1.5 xl:block xl:w-12">
              <Bell className="xl:h-10.5 h-5 w-5 rotate-0 stroke-2 text-[#000000] opacity-100 xl:absolute xl:left-0 xl:top-4 xl:w-9" />

              {notificationCount > 0 && (
                <span className="xl:h-5.25 text-2 xl:text-2.75 absolute -right-1 -top-1 flex h-3.5 w-3.5 rotate-0 items-center justify-center gap-2.5 rounded-full border border-white bg-[#E53935] p-0.5 font-bold leading-none text-white opacity-100 xl:right-0 xl:top-0 xl:w-5 xl:p-1">
                  {notificationCount}
                </span>
              )}
            </div>
          </button>

          {/* Shopping Cart Icon */}
          <button
            aria-label="Shopping Cart"
            className="xl:w-18 xl:h-18 relative flex h-9 w-9 rotate-0 cursor-pointer items-center justify-center text-[#000000] opacity-100 sm:h-12 sm:w-12"
          >
            <div className="xl:left-4.5 xl:h-14.5 pointer-events-none relative flex h-full w-full rotate-0 items-center justify-center opacity-100 xl:absolute xl:top-1.5 xl:block xl:w-12">
              <ShoppingCart className="xl:h-10.5 h-5 w-5 rotate-0 stroke-2 text-[#000000] opacity-100 xl:absolute xl:left-0 xl:top-4 xl:w-9" />

              {cartCount > 0 && (
                <span className="xl:h-5.25 text-2 xl:text-2.75 absolute -right-1 -top-1 flex h-3.5 w-3.5 rotate-0 items-center justify-center gap-2.5 rounded-full border border-white bg-[#E53935] p-0.5 font-bold leading-none text-white opacity-100 xl:right-0 xl:top-0 xl:w-5 xl:p-1">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* User Profile Container */}
        <div className="xl:h-18 group box-border flex h-auto w-auto rotate-0 cursor-pointer select-none items-center gap-2 opacity-100 xl:gap-2.5">
          {/* Profile Image */}
          <div className="xl:w-18 xl:h-18 relative h-8 w-8 shrink-0 rotate-0 overflow-hidden rounded-full border border-gray-200 opacity-100 sm:h-12 sm:w-12 xl:border-none">
            {userAvatar && (
              <Image
                src={userAvatar}
                alt={userName}
                width={72}
                height={72}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Profile Text Layout (hidden on small screens) */}
          <div className="w-30.25 h-14.25 hidden rotate-0 flex-col justify-center text-left opacity-100 lg:flex">
            <span className="w-30.25 h-6.75 font-poppins text-4.5 flex items-center truncate font-medium leading-none tracking-normal text-[#000000] opacity-50">
              Hello, {userName}
            </span>
            <span className="w-30.25 h-7.5 font-poppins text-5 flex items-center font-semibold leading-none tracking-normal text-[#000000] opacity-100">
              My Account
            </span>
          </div>

          {/* Profile Chevron Layout */}
          <ChevronDown className="hidden h-6 w-6 shrink-0 rotate-0 text-[#000000] opacity-100 transition-transform group-hover:translate-y-0.5 lg:block xl:h-8 xl:w-8" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full flex-col border-t border-gray-100 bg-white px-4 py-6 shadow-lg xl:hidden">
          <nav className="flex flex-col gap-4 font-sans">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-poppins text-4.5 py-2 font-semibold leading-none tracking-normal ${
                  (link.active ?? pathname === link.href)
                    ? "text-[#F3380B]"
                    : "text-[#09090B] hover:text-[#F3380B]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-200">
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
              <span className="font-poppins text-4 font-medium text-[#000000]">
                Hello, {userName}
              </span>
            </div>

            {/* Mobile Search Bar inside menu */}
            <div className="rounded-2 mt-2 box-border flex h-12 w-full items-center justify-between gap-2 bg-[#F6F6F6] px-3 md:hidden">
              <input
                type="text"
                placeholder="Search..."
                className="font-poppins text-3.5 h-full w-full border-none bg-transparent font-medium text-[#000000] placeholder-[#000000] opacity-100 outline-none placeholder:opacity-50"
              />
              <Search className="h-5 w-5 text-[#000000] opacity-50" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
