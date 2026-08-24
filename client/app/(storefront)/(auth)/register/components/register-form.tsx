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
    <form
      className="flex w-full flex-col items-center gap-4 lg:gap-6"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Field layout */}
      <div className="flex w-full flex-col gap-4 lg:gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="firstName"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
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
              className="focus:ring-primary h-10 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11"
            />
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="lastName"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
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
              className="focus:ring-primary h-10 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11"
            />
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="email"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
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
              className="focus:ring-primary h-10 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11"
            />
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="phone"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
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
              className="focus:ring-primary h-10 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11"
            />
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="password"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
            >
              Password
            </label>
            <div className="relative h-10 w-full lg:h-11">
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-primary h-full w-full rounded-lg border border-black/25 bg-white pl-4 pr-12 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2"
              />
              <Eye className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/25" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="confirmPassword"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
            >
              Confirm Password
            </label>
            <div className="relative h-10 w-full lg:h-11">
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="focus:ring-primary h-full w-full rounded-lg border border-black/25 bg-white pl-4 pr-12 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2"
              />
              <Eye className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/25" />
            </div>
          </div>
        </div>

        <div className="mt-auto flex w-full items-start gap-2 pt-2 sm:items-center">
          <div className="flex shrink-0 items-center justify-center">
            <input
              type="checkbox"
              id="agree"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="text-primary focus:ring-primary h-4 w-4 cursor-pointer rounded border border-black/25 bg-white lg:h-5 lg:w-5"
            />
          </div>
          <label
            htmlFor="agree"
            className="flex cursor-pointer flex-wrap items-center gap-1"
          >
            <span className="font-['Poppins'] text-xs font-semibold text-black sm:text-sm">
              I agree to the
            </span>
            <Link
              href="#"
              className="text-primary hover:text-primary/90 font-['Poppins'] text-xs font-semibold underline transition-colors sm:text-sm"
            >
              Terms & Conditions
            </Link>
            <span className="font-['Poppins'] text-xs font-semibold text-black sm:text-sm">
              and
            </span>
            <Link
              href="#"
              className="text-primary hover:text-primary/90 font-['Poppins'] text-xs font-semibold underline transition-colors sm:text-sm"
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
        className="bg-primary hover:bg-primary/90 mt-2 flex h-10 w-full items-center justify-center rounded-lg shadow-md transition-all lg:mt-4 lg:h-11"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">
          Sign Up
        </span>
      </button>

      <SocialAuth />
    </form>
  );
}
