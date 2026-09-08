import React from "react";
import { Link } from "@tanstack/react-router";
import { ErpLogoWhite, PlayStoreBadge, AppStoreBadge } from "@/assets/images";

export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Footer({ className = "", style }: FooterProps) {
  return (
    <footer
      style={style}
      className={`xl:h-140.75 mx-auto box-border flex h-auto w-full max-w-[1920px] flex-col gap-8 overflow-hidden bg-[#0A172C] pb-10 pl-6 pr-6 pt-10 text-white transition-all duration-200 md:pl-12 md:pr-12 xl:gap-10 xl:pb-10 xl:pl-20 xl:pr-20 xl:pt-20 ${className}`}
    >
      {/* 1. Main Frame Layout (w: 1760px, h: 333px, responsive grid/flex) */}
      <div className="xl:h-83.25 box-border grid h-auto w-full max-w-[1760px] grid-cols-1 items-start justify-between gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row xl:gap-0">
        {/* Column 1: Brand / Logo & About */}
        <div className="xl:w-95.25 flex w-full flex-col gap-5 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="h-12.5 w-50 sm:h-15 sm:w-62 group flex items-center">
            <img
              src={ErpLogoWhite}
              alt="ERP Flash Deal"
              width={248}
              height={60}
              className="h-full w-full object-contain"
            />
          </Link>
          <p className="max-w-95.25 xl:h-22.5 xl:leading-7.5 mb-2.5 h-auto w-full font-['Poppins',sans-serif] text-[16px] font-normal leading-relaxed tracking-normal text-[#FFFFFF] opacity-75 sm:text-[18px] xl:mb-5 xl:text-[20px]">
            Your one-stop destination for the best
            <br className="hidden sm:block" />
            flash deals on top brands. Register,
            <br className="hidden sm:block" />
            shop and save big!
          </p>
          <div className="h-12.5 max-w-65 mb-10 flex w-full items-center gap-5">
            <a
              href="#"
              className="sm:h-12.5 sm:w-12.5 flex h-11 w-11 cursor-pointer items-center justify-center text-[#A1A1AA] transition-colors hover:text-white"
              aria-label="Facebook"
            >
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="#"
              className="sm:h-12.5 sm:w-12.5 flex h-11 w-11 cursor-pointer items-center justify-center text-[#A1A1AA] transition-colors hover:text-white"
              aria-label="Instagram"
            >
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
            <a
              href="#"
              className="sm:h-12.5 sm:w-12.5 flex h-11 w-11 cursor-pointer items-center justify-center text-[#A1A1AA] transition-colors hover:text-white"
              aria-label="Twitter"
            >
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a
              href="#"
              className="sm:h-12.5 sm:w-12.5 flex h-11 w-11 cursor-pointer items-center justify-center text-[#A1A1AA] transition-colors hover:text-white"
              aria-label="YouTube"
            >
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Customer Service */}
        <div className="xl:h-83.25 xl:w-49.75 flex h-auto w-full flex-col gap-4 sm:gap-5">
          <h3 className="xl:h-8.25 xl:w-49.75 xl:leading-8.25 h-auto w-full font-['Poppins',sans-serif] text-[18px] font-semibold leading-snug tracking-normal text-[#FFFFFF] sm:text-[20px] xl:text-[22px]">
            Customer Service
          </h3>
          <ul className="flex flex-col gap-3 font-['Poppins',sans-serif] text-[16px] text-[#FFFFFF] sm:gap-4 sm:text-[18px] xl:gap-5 xl:text-[20px]">
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Help Center
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                How It Works
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Shipping & Delivery
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Returns & Refunds
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Privacy & Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: My Account */}
        <div className="xl:h-83.25 xl:w-49.75 flex h-auto w-full flex-col gap-4 sm:gap-5">
          <h3 className="xl:h-8.25 xl:w-49.75 xl:leading-8.25 h-auto w-full font-['Poppins',sans-serif] text-[18px] font-semibold leading-snug tracking-normal text-[#FFFFFF] sm:text-[20px] xl:text-[22px]">
            My Account
          </h3>
          <ul className="flex flex-col gap-3 font-['Poppins',sans-serif] text-[16px] text-[#FFFFFF] sm:gap-4 sm:text-[18px] xl:gap-5 xl:text-[20px]">
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                My Profile
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                My Orders
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                My Registrations
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Wishlist
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Notifications
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Useful Links */}
        <div className="xl:h-83.25 xl:w-49.75 flex h-auto w-full flex-col gap-4 sm:gap-5">
          <h3 className="xl:h-8.25 xl:w-49.75 xl:leading-8.25 h-auto w-full font-['Poppins',sans-serif] text-[18px] font-semibold leading-snug tracking-normal text-[#FFFFFF] sm:text-[20px] xl:text-[22px]">
            Useful Links
          </h3>
          <ul className="flex flex-col gap-3 font-['Poppins',sans-serif] text-[16px] text-[#FFFFFF] sm:gap-4 sm:text-[18px] xl:gap-5 xl:text-[20px]">
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                About Us
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Contact Us
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                FAQs
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Blog
              </Link>
            </li>
            <li className="xl:h-7.5 xl:leading-7.5 h-auto leading-snug">
              <Link to="/" className="block transition-colors hover:text-white">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Download Our App */}
        <div className="xl:h-73.25 xl:w-72.75 flex h-auto w-full flex-col gap-4 sm:col-span-2 sm:gap-5 lg:col-span-1">
          <h3 className="xl:h-8.25 xl:w-72.75 xl:leading-8.25 h-auto w-full font-['Poppins',sans-serif] text-[18px] font-semibold leading-snug tracking-normal text-[#FFFFFF] sm:text-[20px] xl:text-[22px]">
            Download Our App
          </h3>
          <p className="max-w-72.75 xl:h-15 xl:leading-7.5 h-auto w-full font-['Poppins',sans-serif] text-[16px] font-normal leading-relaxed text-white opacity-75 sm:text-[18px] xl:text-[20px]">
            Get exclusive app-only deals and faster access.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row xl:flex-col">
            <a
              href="#"
              className="h-15 w-50 sm:h-17.5 block transition-opacity hover:opacity-90 sm:w-[236.25px]"
            >
              <img
                src={PlayStoreBadge}
                alt="Get it on Google Play"
                width={236}
                height={70}
                className="h-full w-full object-contain"
              />
            </a>
            <a
              href="#"
              className="h-15 w-50 sm:h-17.5 block transition-opacity hover:opacity-90 sm:w-[236.25px]"
            >
              <img
                src={AppStoreBadge}
                alt="Download on the App Store"
                width={236}
                height={70}
                className="h-full w-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Below HR Layout */}
      <div className="my-6 h-0 w-full max-w-[1760px] border-t border-solid border-[#FFFFFF] opacity-25 xl:my-0" />

      {/* 3. Third Layout */}
      <div className="xl:h-7.5 flex h-auto w-full max-w-[1760px] flex-col items-center justify-between gap-4 text-center font-['Poppins',sans-serif] text-[14px] text-[#A1A1AA] opacity-100 sm:text-[16px] md:flex-row md:gap-0 md:text-left">
        <p className="xl:h-7.5 xl:w-104.5 xl:leading-7.5 h-auto w-full font-['Poppins',sans-serif] text-[16px] font-normal leading-snug tracking-normal text-[#FFFFFF] opacity-50 sm:text-[18px] xl:text-[20px]">
          © 2026 ERP Flash Deal. All Rights Reserved.
        </p>
        <div className="xl:h-7.5 xl:leading-7.5 flex h-auto flex-wrap items-center justify-center gap-3 font-['Poppins',sans-serif] text-[16px] font-normal leading-snug tracking-normal text-[#FFFFFF] opacity-50 sm:gap-4 sm:text-[18px] md:gap-6 xl:text-[20px]">
          <Link to="/" className="transition-colors hover:text-white">
            Terms & Conditions
          </Link>
          <span className="opacity-50">|</span>
          <Link to="/" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <span className="opacity-50">|</span>
          <Link to="/" className="transition-colors hover:text-white">
            Help & Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
