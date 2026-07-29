"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { SocialAuth } from "../../components/social-auth";

export function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <form className="flex flex-col gap-6 items-center w-full" onSubmit={(e) => e.preventDefault()}>
      {/* Field layout */}
      <div className="w-full max-w-192.5 min-h-106 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col w-full max-w-93.75 h-27.5 gap-2.5">
            <label htmlFor="firstName" className="w-full h-7.5 font-['Poppins'] font-semibold text-[20px] leading-none text-black flex items-center">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-17.5 rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-gray-900 text-[20px] leading-none placeholder:font-['Poppins'] placeholder:font-normal placeholder:text-[20px] placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex flex-col w-full max-w-93.75 h-27.5 gap-2.5">
            <label htmlFor="lastName" className="w-full h-7.5 font-['Poppins'] font-semibold text-[20px] leading-none text-black flex items-center">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-17.5 rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-gray-900 text-[20px] leading-none placeholder:font-['Poppins'] placeholder:font-normal placeholder:text-[20px] placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col w-full max-w-93.75 h-27.5 gap-2.5">
            <label htmlFor="email" className="w-full h-7.5 font-['Poppins'] font-semibold text-[20px] leading-none text-black flex items-center">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-17.5 rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-gray-900 text-[20px] leading-none placeholder:font-['Poppins'] placeholder:font-normal placeholder:text-[20px] placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col w-full max-w-93.75 h-27.5 gap-2.5">
            <label htmlFor="phone" className="w-full h-7.5 font-['Poppins'] font-semibold text-[20px] leading-none text-black flex items-center">
              Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-17.5 rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-gray-900 text-[20px] leading-none placeholder:font-['Poppins'] placeholder:font-normal placeholder:text-[20px] placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex flex-col w-full max-w-93.75 h-27.5 gap-2.5">
            <label htmlFor="password" className="w-full h-7.5 font-['Poppins'] font-semibold text-[20px] leading-none text-black flex items-center">
              Password
            </label>
            <div className="relative w-full h-17.5">
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full rounded-lg border border-black/25 bg-white pl-5 pr-12 py-5 font-['Poppins'] text-gray-900 text-[20px] leading-none placeholder:font-['Poppins'] placeholder:font-normal placeholder:text-[20px] placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Eye className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 text-black/25" />
            </div>
          </div>
          
          <div className="flex flex-col w-full max-w-93.75 h-27.5 gap-2.5">
            <label htmlFor="confirmPassword" className="w-full h-7.5 font-['Poppins'] font-semibold text-[20px] leading-none text-black flex items-center">
              Confirm Password
            </label>
            <div className="relative w-full h-17.5">
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-full rounded-lg border border-black/25 bg-white pl-5 pr-12 py-5 font-['Poppins'] text-gray-900 text-[20px] leading-none placeholder:font-['Poppins'] placeholder:font-normal placeholder:text-[20px] placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Eye className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 text-black/25" />
            </div>
          </div>
        </div>

        <div className="flex items-start sm:items-center w-full max-w-147 h-auto sm:h-8 gap-2.5 mt-auto pt-2">
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <input
              type="checkbox"
              id="agree"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-6 h-6 rounded border border-black/25 text-primary focus:ring-primary bg-white cursor-pointer"
            />
          </div>
          <label htmlFor="agree" className="flex items-center flex-wrap h-auto sm:h-7.5 gap-1 sm:gap-x-2 cursor-pointer pt-1 sm:pt-0">
            <span className="w-auto sm:w-33.5 font-['Poppins'] font-semibold text-[14px] sm:text-[20px] leading-tight sm:leading-none text-black flex items-center">
              I agree to the
            </span>
            <Link href="#" className="w-auto sm:w-50 font-['Poppins'] font-semibold text-[14px] sm:text-[20px] leading-tight sm:leading-none text-primary underline flex items-center">
              Terms & Conditions
            </Link>
            <span className="w-auto font-['Poppins'] font-semibold text-[14px] sm:text-[20px] leading-tight sm:leading-none text-black flex items-center">
              and
            </span>
            <Link href="#" className="w-auto font-['Poppins'] font-semibold text-[14px] sm:text-[20px] leading-tight sm:leading-none text-primary underline flex items-center">
              Privacy Policy
            </Link>
          </label>
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        id="register-submit-btn"
        className="w-full max-w-192.5 h-17.5 p-5 flex items-center justify-between bg-primary hover:bg-primary/90 rounded-lg shadow-md transition-all"
      >
        <span></span>
        <span className="w-19.5 h-7.5 font-['Poppins'] font-bold text-[20px] leading-none text-white flex items-center justify-center">
          Sign Up
        </span>
        <span></span>
      </button>
      
      <SocialAuth />
    </form>
  );
}
