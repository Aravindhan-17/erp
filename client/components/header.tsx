"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";

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
    { label: "How it Works", href: "/#how-it-works" },
  ],
  userName = "John",
  userAvatar = "/images/user.png",
  notificationCount = 3,
  cartCount = 2,
  className = "",
  style,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      style={style}
      className={`w-full max-w-[1920px] min-h-[80px] xl:h-[152px] flex items-center justify-between rotate-0 opacity-100 px-4 md:px-8 xl:px-[40px] py-4 xl:py-0 box-border mx-auto bg-white transition-all duration-200 relative ${className}`}
    >
      {/* 1. Left Section: Logo Container */}
      <div className="flex items-center flex-shrink-0">
        <Link
          href="/"
          className="flex items-center w-[140px] sm:w-[180px] md:w-[200px] xl:w-[248px] h-auto xl:h-[60px] rotate-0 opacity-100 box-border group"
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
      <div className="flex-1 xl:w-[1453px] max-w-full min-h-[48px] xl:h-[72px] flex items-center justify-end gap-3 sm:gap-4 xl:gap-[20px] rotate-0 opacity-100 box-border ml-2 md:ml-4 xl:ml-0">
        
        {/* Mobile Menu Icon (shown only on small screens) */}
        <button 
          className="xl:hidden p-2 text-[#000000]" 
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation Layout Container */}
        <nav className="hidden xl:flex items-center w-[511px] max-w-full h-[72px] gap-[30px] rotate-0 opacity-100 font-sans">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`h-[72px] pt-[21px] pb-[21px] flex items-center justify-center gap-[10px] font-['Poppins',sans-serif] text-[20px] font-semibold leading-none tracking-normal rotate-0 transition-all duration-150 box-border ${
                link.active
                  ? "text-[#F3380B] opacity-100"
                  : "text-[#09090B] hover:text-[#F3380B] opacity-95"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar Container */}
        <div className="hidden md:flex flex-1 xl:flex-none xl:w-[483px] max-w-full h-[40px] xl:h-[72px] items-center justify-between gap-2 xl:gap-[40px] rotate-0 opacity-100 rounded-[8px] px-3 xl:p-[20px] bg-[#F6F6F6] box-border">
          <input
            type="text"
            placeholder="Search for products, brands, categories..."
            className="w-full xl:w-[371px] max-w-full h-full xl:h-[27px] font-['Poppins',sans-serif] text-[14px] xl:text-[18px] font-medium leading-none tracking-normal opacity-50 placeholder:opacity-50 text-[#000000] placeholder-[#000000] outline-none border-none bg-transparent"
          />
          <Search className="w-[20px] h-[20px] xl:w-[32px] xl:h-[32px] rotate-0 opacity-50 text-[#000000] flex-shrink-0 pointer-events-none" />
        </div>

        {/* Mobile Search Icon (shown only on small screens) */}
        <button className="md:hidden p-2 text-[#000000] opacity-50" aria-label="Search" onClick={() => setIsMobileMenuOpen(true)}>
          <Search className="w-5 h-5" />
        </button>

        {/* Icons Layout Container */}
        <div className="w-auto xl:w-[154px] max-w-full min-h-[48px] xl:h-[72px] flex items-center gap-1 sm:gap-2 xl:gap-[10px] rotate-0 opacity-100 box-border">
          {/* Bell Icon */}
          <button
            aria-label="Notifications"
            className="relative w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] xl:w-[72px] xl:h-[72px] rotate-0 opacity-100 flex items-center justify-center text-[#000000] cursor-pointer"
          >
            <div className="relative xl:absolute xl:top-[6px] xl:left-[18px] w-full h-full xl:w-[48px] xl:h-[58px] rotate-0 opacity-100 pointer-events-none flex items-center justify-center xl:block">
              <Bell className="xl:absolute xl:top-[16px] xl:left-0 w-[20px] h-[20px] xl:w-[36px] xl:h-[42px] rotate-0 opacity-100 text-[#000000] stroke-[2]" />
              
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 xl:top-0 xl:right-0 w-[14px] h-[14px] xl:w-[20px] xl:h-[21px] rotate-0 opacity-100 gap-[10px] rounded-[48px] p-[2px] xl:p-[4px] bg-[#E53935] text-white text-[8px] xl:text-[11px] font-bold flex items-center justify-center border border-white leading-none">
                  {notificationCount}
                </span>
              )}
            </div>
          </button>

          {/* Shopping Cart Icon */}
          <button
            aria-label="Shopping Cart"
            className="relative w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] xl:w-[72px] xl:h-[72px] rotate-0 opacity-100 flex items-center justify-center text-[#000000] cursor-pointer"
          >
            <div className="relative xl:absolute xl:top-[6px] xl:left-[18px] w-full h-full xl:w-[48px] xl:h-[58px] rotate-0 opacity-100 pointer-events-none flex items-center justify-center xl:block">
              <ShoppingCart className="xl:absolute xl:top-[16px] xl:left-0 w-[20px] h-[20px] xl:w-[36px] xl:h-[42px] rotate-0 opacity-100 text-[#000000] stroke-[2]" />
              
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 xl:top-0 xl:right-0 w-[14px] h-[14px] xl:w-[20px] xl:h-[21px] rotate-0 opacity-100 gap-[10px] rounded-[48px] p-[2px] xl:p-[4px] bg-[#E53935] text-white text-[8px] xl:text-[11px] font-bold flex items-center justify-center border border-white leading-none">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* User Profile Container */}
        <div className="w-auto xl:w-[245px] max-w-full h-auto xl:h-[72px] flex items-center gap-2 xl:gap-[10px] rotate-0 opacity-100 cursor-pointer group select-none box-border">
          {/* Profile Image */}
          <div className="relative w-[32px] h-[32px] sm:w-[48px] sm:h-[48px] xl:w-[72px] xl:h-[72px] rounded-full overflow-hidden flex-shrink-0 rotate-0 opacity-100 border border-gray-200 xl:border-none">
            <Image
              src={userAvatar}
              alt={userName}
              width={72}
              height={72}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>

          {/* Profile Text Layout (hidden on small screens) */}
          <div className="hidden lg:flex w-[121px] h-[57px] flex-col justify-center text-left rotate-0 opacity-100">
            <span className="w-[121px] h-[27px] font-['Poppins',sans-serif] text-[18px] font-medium leading-none tracking-normal opacity-50 text-[#000000] flex items-center truncate">
              Hello, {userName}
            </span>
            <span className="w-[121px] h-[30px] font-['Poppins',sans-serif] text-[20px] font-semibold leading-none tracking-normal opacity-100 text-[#000000] flex items-center">
              My Account
            </span>
          </div>

          {/* Profile Chevron Layout */}
          <ChevronDown className="hidden lg:block w-[24px] h-[24px] xl:w-[32px] xl:h-[32px] rotate-0 opacity-100 text-[#000000] flex-shrink-0 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 xl:hidden flex flex-col px-4 py-6 border-t border-gray-100">
          <nav className="flex flex-col gap-4 font-sans">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-['Poppins',sans-serif] text-[18px] font-semibold leading-none tracking-normal py-2 ${
                  link.active
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
               <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden border border-gray-200">
                  <Image src={userAvatar} alt={userName} width={48} height={48} className="w-full h-full object-cover" unoptimized />
               </div>
               <span className="font-['Poppins',sans-serif] text-[16px] font-medium text-[#000000]">
                 Hello, {userName}
               </span>
            </div>
            
            {/* Mobile Search Bar inside menu */}
            <div className="md:hidden w-full h-[48px] flex items-center justify-between gap-2 rounded-[8px] px-3 mt-2 bg-[#F6F6F6] box-border">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full font-['Poppins',sans-serif] text-[14px] font-medium opacity-100 placeholder:opacity-50 text-[#000000] placeholder-[#000000] outline-none border-none bg-transparent"
              />
              <Search className="w-[20px] h-[20px] opacity-50 text-[#000000]" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
