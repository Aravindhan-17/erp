"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  navLinks?: NavItem[];
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  cartCount?: number;
  onSearch?: (query: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Header({
  logoSrc = "/images/erp-logo.svg",
  logoAlt = "ERP Flash Deal",
  navLinks = [
    { label: "Home", href: "/", active: true },
    { label: "Flash Deals", href: "/flash-deals" },
    { label: "Categories", href: "/categories" },
    { label: "How it Works", href: "/how-it-works" },
  ],
  userName = "John",
  userAvatar = "/images/user.png",
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
      className={`w-full max-w-[1920px] mx-auto min-h-[80px] lg:h-[120px] xl:h-[152px] flex items-center justify-between px-4 md:px-8 lg:px-10 py-4 lg:py-0 bg-white transition-all duration-200 relative ${className}`}
    >
      {/* 1. Left Section: Logo Container */}
      <div className="flex items-center flex-shrink-0">
        <Link
          href="/"
          className="flex items-center w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto lg:h-14 xl:h-16 group"
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={248}
            height={60}
            quality={100}
            unoptimized
            className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>
      </div>

      {/* 2. Right Section: Navigation & Action Content Container */}
      <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 ml-2 sm:ml-4 lg:ml-8 min-w-0">
        
        {/* Mobile Menu Icon (shown only on small screens) */}
        <button 
          className="lg:hidden p-1.5 sm:p-2 text-black flex-shrink-0" 
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>

        {/* Navigation Layout Container */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 font-sans flex-shrink-0">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`flex items-center justify-center font-poppins text-base lg:text-lg xl:text-xl font-semibold transition-all duration-150 whitespace-nowrap ${
                (link.active ?? pathname === link.href)
                  ? "text-secondary"
                  : "text-[#09090B] hover:text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar Container */}
        <div className="hidden md:flex flex-1 lg:flex-none lg:w-48 xl:w-96 h-10 sm:h-12 lg:h-12 xl:h-14 items-center justify-between gap-2 xl:gap-4 rounded-lg px-3 xl:px-4 bg-[#F6F6F6] min-w-0">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-full font-poppins text-xs lg:text-sm xl:text-base font-medium placeholder:text-black/50 text-black outline-none bg-transparent min-w-0"
          />
          <Search className="w-4 h-4 xl:w-6 xl:h-6 text-black/50 flex-shrink-0" />
        </div>

        {/* Mobile Search Icon (shown only on small screens) */}
        <button className="md:hidden p-1.5 sm:p-2 text-black/50 flex-shrink-0" aria-label="Search" onClick={() => setIsMobileMenuOpen(true)}>
          <Search className="w-5 h-5" />
        </button>

        {/* Icons Layout Container */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 xl:gap-6 flex-shrink-0">
          {/* Bell Icon */}
          <button
            aria-label="Notifications"
            className="relative p-1.5 sm:p-2 flex items-center justify-center text-black"
          >
            <Bell className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 stroke-[2]" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 lg:top-1 lg:right-1 w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 rounded-full bg-[#E53935] text-white text-[10px] lg:text-[10px] xl:text-xs font-bold flex items-center justify-center border border-white">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Icon */}
          <button
            aria-label="Shopping Cart"
            className="relative p-1.5 sm:p-2 flex items-center justify-center text-black"
          >
            <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 lg:top-1 lg:right-1 w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 rounded-full bg-[#E53935] text-white text-[10px] lg:text-[10px] xl:text-xs font-bold flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* User Profile Container */}
        <div className="flex items-center gap-1.5 lg:gap-3 cursor-pointer group select-none flex-shrink-0">
          {/* Profile Image */}
          <div className="relative w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
            <Image
              src={userAvatar}
              alt={userName}
              width={56}
              height={56}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>

          {/* Profile Text Layout (hidden on small screens) */}
          <div className="hidden lg:flex flex-col justify-center">
            <span className="font-poppins text-xs xl:text-sm font-medium text-black/50 whitespace-nowrap">
              Hello, {userName}
            </span>
            <span className="font-poppins text-sm xl:text-base font-semibold text-black whitespace-nowrap">
              My Account
            </span>
          </div>

          {/* Profile Chevron Layout */}
          <ChevronDown className="hidden lg:block w-4 h-4 xl:w-6 xl:h-6 text-black flex-shrink-0 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl z-50 lg:hidden flex flex-col px-4 py-6 border-t border-gray-100">
          <nav className="flex flex-col gap-4 font-sans">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-poppins text-lg font-semibold py-2 transition-colors ${
                  (link.active ?? pathname === link.href)
                    ? "text-[#F3380B]"
                    : "text-[#09090B] hover:text-[#F3380B]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
               <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                  <Image src={userAvatar} alt={userName} width={48} height={48} className="w-full h-full object-cover" unoptimized />
               </div>
               <span className="font-poppins text-base font-medium text-black">
                 Hello, {userName}
               </span>
            </div>
            
            {/* Mobile Search Bar inside menu */}
            <div className="md:hidden w-full h-12 flex items-center justify-between gap-3 rounded-lg px-4 mt-2 bg-[#F6F6F6]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full font-poppins text-sm font-medium placeholder:text-black/50 text-black outline-none bg-transparent"
              />
              <Search className="w-5 h-5 text-black/50" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
