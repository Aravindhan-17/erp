import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ErpLogoWhite, PlayStoreBadge, AppStoreBadge } from "@/assets/images";

export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Footer({ className = "", style }: FooterProps) {
  return (
    <footer
      style={style}
      className={`w-full max-w-[1920px] h-auto xl:h-[563px] flex flex-col pt-10 xl:pt-[80px] pr-6 md:pr-12 xl:pr-[80px] pb-10 xl:pb-[40px] pl-6 md:pl-12 xl:pl-[80px] gap-8 xl:gap-[40px] box-border mx-auto bg-[#0A172C] text-white transition-all duration-200 overflow-hidden ${className}`}
    >
      {/* 1. Main Frame Layout (w: 1760px, h: 333px, responsive grid/flex) */}
      <div className="w-full max-w-[1760px] h-auto xl:h-[333px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row justify-between items-start gap-10 xl:gap-0 box-border">

        {/* Column 1: Brand / Logo & About */}
        <div className="flex flex-col gap-[20px] w-full xl:w-[381px] sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center w-[200px] sm:w-[248px] h-[50px] sm:h-[60px] group">
            <Image
              src={ErpLogoWhite}
              alt="ERP Flash Deal"
              width={248}
              height={60}
              className="w-full h-full object-contain"
              priority
            />
          </Link>
          <p className="w-full max-w-[381px] h-auto xl:h-[90px] font-['Poppins',sans-serif] text-[16px] sm:text-[18px] xl:text-[20px] text-[#FFFFFF] opacity-75 font-normal leading-relaxed xl:leading-[30px] tracking-normal mb-[10px] xl:mb-[20px]">
            Your one-stop destination for the best<br className="hidden sm:block" />
            flash deals on top brands. Register,<br className="hidden sm:block" />
            shop and save big!
          </p>
          <div className="w-full max-w-[260px] h-[50px] flex items-center gap-[20px] mb-[40px]">
            <a href="#" className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors cursor-pointer" aria-label="Facebook">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors cursor-pointer" aria-label="Instagram">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
            <a href="#" className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors cursor-pointer" aria-label="Twitter">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a href="#" className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors cursor-pointer" aria-label="YouTube">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Customer Service */}
        <div className="w-full xl:w-[199px] h-auto xl:h-[333px] flex flex-col gap-[16px] sm:gap-[20px]">
          <h3 className="w-full xl:w-[199px] h-auto xl:h-[33px] font-['Poppins',sans-serif] text-[18px] sm:text-[20px] xl:text-[22px] font-semibold text-[#FFFFFF] leading-snug xl:leading-[33px] tracking-normal">
            Customer Service
          </h3>
          <ul className="flex flex-col gap-[12px] sm:gap-[16px] xl:gap-[20px] font-['Poppins',sans-serif] text-[16px] sm:text-[18px] xl:text-[20px] text-[#FFFFFF]">
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Help Center</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">How It Works</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Shipping & Delivery</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Returns & Refunds</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Terms & Conditions</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Privacy & Policy</Link></li>
          </ul>
        </div>

        {/* Column 3: My Account */}
        <div className="w-full xl:w-[199px] h-auto xl:h-[333px] flex flex-col gap-[16px] sm:gap-[20px]">
          <h3 className="w-full xl:w-[199px] h-auto xl:h-[33px] font-['Poppins',sans-serif] text-[18px] sm:text-[20px] xl:text-[22px] font-semibold text-[#FFFFFF] leading-snug xl:leading-[33px] tracking-normal">
            My Account
          </h3>
          <ul className="flex flex-col gap-[12px] sm:gap-[16px] xl:gap-[20px] font-['Poppins',sans-serif] text-[16px] sm:text-[18px] xl:text-[20px] text-[#FFFFFF]">
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">My Profile</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">My Orders</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">My Registrations</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Wishlist</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Notifications</Link></li>
          </ul>
        </div>

        {/* Column 4: Useful Links */}
        <div className="w-full xl:w-[199px] h-auto xl:h-[333px] flex flex-col gap-[16px] sm:gap-[20px]">
          <h3 className="w-full xl:w-[199px] h-auto xl:h-[33px] font-['Poppins',sans-serif] text-[18px] sm:text-[20px] xl:text-[22px] font-semibold text-[#FFFFFF] leading-snug xl:leading-[33px] tracking-normal">
            Useful Links
          </h3>
          <ul className="flex flex-col gap-[12px] sm:gap-[16px] xl:gap-[20px] font-['Poppins',sans-serif] text-[16px] sm:text-[18px] xl:text-[20px] text-[#FFFFFF]">
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">About Us</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Contact Us</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">FAQs</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Blog</Link></li>
            <li className="h-auto xl:h-[30px] leading-snug xl:leading-[30px]"><Link href="#" className="hover:text-white transition-colors block">Sitemap</Link></li>
          </ul>
        </div>

        {/* Column 5: Download Our App */}
        <div className="w-full xl:w-[291px] h-auto xl:h-[293px] flex flex-col gap-[16px] sm:gap-[20px] sm:col-span-2 lg:col-span-1">
          <h3 className="w-full xl:w-[291px] h-auto xl:h-[33px] font-['Poppins',sans-serif] text-[18px] sm:text-[20px] xl:text-[22px] font-semibold text-[#FFFFFF] leading-snug xl:leading-[33px] tracking-normal">
            Download Our App
          </h3>
          <p className="w-full max-w-[291px] h-auto xl:h-[60px] font-['Poppins',sans-serif] text-[16px] sm:text-[18px] xl:text-[20px] text-white opacity-75 font-normal leading-relaxed xl:leading-[30px]">
            Get exclusive app-only deals and faster access.
          </p>
          <div className="flex flex-col sm:flex-row xl:flex-col gap-[16px]">
            <a href="#" className="block hover:opacity-90 transition-opacity w-[200px] sm:w-[236.25px] h-[60px] sm:h-[70px]">
              <Image src={PlayStoreBadge} alt="Get it on Google Play" width={236} height={70} className="w-full h-full object-contain" />
            </a>
            <a href="#" className="block hover:opacity-90 transition-opacity w-[200px] sm:w-[236.25px] h-[60px] sm:h-[70px]">
              <Image src={AppStoreBadge} alt="Download on the App Store" width={236} height={70} className="w-full h-full object-contain" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Below HR Layout */}
      <div className="w-full max-w-[1760px] h-[0px] opacity-25 border-t border-[#FFFFFF] border-solid my-6 xl:my-0" />

      {/* 3. Third Layout */}
      <div className="w-full max-w-[1760px] h-auto xl:h-[30px] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 opacity-100 font-['Poppins',sans-serif] text-[14px] sm:text-[16px] text-[#A1A1AA] text-center md:text-left">
        <p className="w-full xl:w-[418px] h-auto xl:h-[30px] font-['Poppins',sans-serif] text-[16px] sm:text-[18px] xl:text-[20px] text-[#FFFFFF] opacity-50 font-normal leading-snug xl:leading-[30px] tracking-normal">
          © 2026 ERP Flash Deal. All Rights Reserved.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-[12px] sm:gap-[16px] md:gap-[24px] h-auto xl:h-[30px] font-['Poppins',sans-serif] text-[16px] sm:text-[18px] xl:text-[20px] text-[#FFFFFF] opacity-50 font-normal leading-snug xl:leading-[30px] tracking-normal">
          <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <span className="opacity-50">|</span>
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="opacity-50">|</span>
          <Link href="#" className="hover:text-white transition-colors">Help & Support</Link>
        </div>
      </div>
    </footer>
  );
}
