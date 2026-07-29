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
    <form className="flex w-full flex-col items-center gap-6" onSubmit={(e) => e.preventDefault()}>
      {/* Field layout */}
      <div className="max-w-192.5 min-h-106 flex w-full flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="max-w-93.75 h-27.5 flex w-full flex-col gap-2.5">
            <label
              htmlFor="firstName"
              className="h-7.5 flex w-full items-center font-['Poppins'] text-[20px] font-semibold leading-none text-black"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-17.5 focus:ring-primary w-full rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="max-w-93.75 h-27.5 flex w-full flex-col gap-2.5">
            <label
              htmlFor="lastName"
              className="h-7.5 flex w-full items-center font-['Poppins'] text-[20px] font-semibold leading-none text-black"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-17.5 focus:ring-primary w-full rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="max-w-93.75 h-27.5 flex w-full flex-col gap-2.5">
            <label
              htmlFor="email"
              className="h-7.5 flex w-full items-center font-['Poppins'] text-[20px] font-semibold leading-none text-black"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-17.5 focus:ring-primary w-full rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="max-w-93.75 h-27.5 flex w-full flex-col gap-2.5">
            <label
              htmlFor="phone"
              className="h-7.5 flex w-full items-center font-['Poppins'] text-[20px] font-semibold leading-none text-black"
            >
              Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-17.5 focus:ring-primary w-full rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="max-w-93.75 h-27.5 flex w-full flex-col gap-2.5">
            <label
              htmlFor="password"
              className="h-7.5 flex w-full items-center font-['Poppins'] text-[20px] font-semibold leading-none text-black"
            >
              Password
            </label>
            <div className="h-17.5 relative w-full">
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-primary h-full w-full rounded-lg border border-black/25 bg-white py-5 pl-5 pr-12 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
              />
              <Eye className="absolute right-5 top-1/2 h-8 w-8 -translate-y-1/2 text-black/25" />
            </div>
          </div>

          <div className="max-w-93.75 h-27.5 flex w-full flex-col gap-2.5">
            <label
              htmlFor="confirmPassword"
              className="h-7.5 flex w-full items-center font-['Poppins'] text-[20px] font-semibold leading-none text-black"
            >
              Confirm Password
            </label>
            <div className="h-17.5 relative w-full">
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="focus:ring-primary h-full w-full rounded-lg border border-black/25 bg-white py-5 pl-5 pr-12 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
              />
              <Eye className="absolute right-5 top-1/2 h-8 w-8 -translate-y-1/2 text-black/25" />
            </div>
          </div>
        </div>

        <div className="max-w-147 mt-auto flex h-auto w-full items-start gap-2.5 pt-2 sm:h-8 sm:items-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              id="agree"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="text-primary focus:ring-primary h-6 w-6 cursor-pointer rounded border border-black/25 bg-white"
            />
          </div>
          <label
            htmlFor="agree"
            className="sm:h-7.5 flex h-auto cursor-pointer flex-wrap items-center gap-1 pt-1 sm:gap-x-2 sm:pt-0"
          >
            <span className="sm:w-33.5 flex w-auto items-center font-['Poppins'] text-[14px] font-semibold leading-tight text-black sm:text-[20px] sm:leading-none">
              I agree to the
            </span>
            <Link
              href="#"
              className="sm:w-50 text-primary flex w-auto items-center font-['Poppins'] text-[14px] font-semibold leading-tight underline sm:text-[20px] sm:leading-none"
            >
              Terms & Conditions
            </Link>
            <span className="flex w-auto items-center font-['Poppins'] text-[14px] font-semibold leading-tight text-black sm:text-[20px] sm:leading-none">
              and
            </span>
            <Link
              href="#"
              className="text-primary flex w-auto items-center font-['Poppins'] text-[14px] font-semibold leading-tight underline sm:text-[20px] sm:leading-none"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        id="register-submit-btn"
        className="max-w-192.5 h-17.5 bg-primary hover:bg-primary/90 flex w-full items-center justify-between rounded-lg p-5 shadow-md transition-all"
      >
        <span></span>
        <span className="w-19.5 h-7.5 flex items-center justify-center font-['Poppins'] text-[20px] font-bold leading-none text-white">
          Sign Up
        </span>
        <span></span>
      </button>

      <SocialAuth />
    </form>
  );
}
