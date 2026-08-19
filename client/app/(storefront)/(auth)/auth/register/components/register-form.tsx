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
      <div className="max-w-192.5 flex w-full flex-col gap-4 lg:gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="firstName"
              className="flex w-full items-center font-['Poppins'] text-base font-semibold leading-none text-black xl:text-lg 2xl:text-[20px]"
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
              className="2xl:h-17.5 focus:ring-primary h-12 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-base leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-14 xl:text-lg xl:placeholder:text-lg 2xl:p-5 2xl:text-[20px] 2xl:placeholder:text-[20px]"
            />
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="lastName"
              className="flex w-full items-center font-['Poppins'] text-base font-semibold leading-none text-black xl:text-lg 2xl:text-[20px]"
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
              className="2xl:h-17.5 focus:ring-primary h-12 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-base leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-14 xl:text-lg xl:placeholder:text-lg 2xl:p-5 2xl:text-[20px] 2xl:placeholder:text-[20px]"
            />
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="email"
              className="flex w-full items-center font-['Poppins'] text-base font-semibold leading-none text-black xl:text-lg 2xl:text-[20px]"
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
              className="2xl:h-17.5 focus:ring-primary h-12 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-base leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-14 xl:text-lg xl:placeholder:text-lg 2xl:p-5 2xl:text-[20px] 2xl:placeholder:text-[20px]"
            />
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="phone"
              className="flex w-full items-center font-['Poppins'] text-base font-semibold leading-none text-black xl:text-lg 2xl:text-[20px]"
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
              className="2xl:h-17.5 focus:ring-primary h-12 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-base leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-14 xl:text-lg xl:placeholder:text-lg 2xl:p-5 2xl:text-[20px] 2xl:placeholder:text-[20px]"
            />
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="password"
              className="flex w-full items-center font-['Poppins'] text-base font-semibold leading-none text-black xl:text-lg 2xl:text-[20px]"
            >
              Password
            </label>
            <div className="2xl:h-17.5 relative h-12 w-full lg:h-14">
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-primary h-full w-full rounded-lg border border-black/25 bg-white pl-4 pr-12 font-['Poppins'] text-base leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 xl:text-lg xl:placeholder:text-lg 2xl:pl-5 2xl:text-[20px] 2xl:placeholder:text-[20px]"
              />
              <Eye className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/25 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="confirmPassword"
              className="flex w-full items-center font-['Poppins'] text-base font-semibold leading-none text-black xl:text-lg 2xl:text-[20px]"
            >
              Confirm Password
            </label>
            <div className="2xl:h-17.5 relative h-12 w-full lg:h-14">
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="focus:ring-primary h-full w-full rounded-lg border border-black/25 bg-white pl-4 pr-12 font-['Poppins'] text-base leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2 xl:text-lg xl:placeholder:text-lg 2xl:pl-5 2xl:text-[20px] 2xl:placeholder:text-[20px]"
              />
              <Eye className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/25 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8" />
            </div>
          </div>
        </div>

        <div className="mt-auto flex w-full items-start gap-2.5 pt-2 sm:items-center">
          <div className="flex shrink-0 items-center justify-center">
            <input
              type="checkbox"
              id="agree"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="text-primary focus:ring-primary h-5 w-5 cursor-pointer rounded border border-black/25 bg-white 2xl:h-6 2xl:w-6"
            />
          </div>
          <label
            htmlFor="agree"
            className="flex cursor-pointer flex-wrap items-center gap-1 sm:gap-x-2"
          >
            <span className="flex items-center font-['Poppins'] text-sm font-semibold leading-tight text-black sm:text-base 2xl:text-[20px]">
              I agree to the
            </span>
            <Link
              href="#"
              className="text-primary hover:text-primary/90 flex items-center font-['Poppins'] text-sm font-semibold leading-tight underline transition-colors sm:text-base 2xl:text-[20px]"
            >
              Terms & Conditions
            </Link>
            <span className="flex items-center font-['Poppins'] text-sm font-semibold leading-tight text-black sm:text-base 2xl:text-[20px]">
              and
            </span>
            <Link
              href="#"
              className="text-primary hover:text-primary/90 flex items-center font-['Poppins'] text-sm font-semibold leading-tight underline transition-colors sm:text-base 2xl:text-[20px]"
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
        className="max-w-192.5 2xl:h-17.5 bg-primary hover:bg-primary/90 mt-2 flex h-12 w-full items-center justify-between rounded-lg px-4 shadow-md transition-all lg:mt-4 lg:h-14 2xl:p-5"
      >
        <span></span>
        <span className="flex items-center justify-center font-['Poppins'] text-base font-bold leading-none text-white xl:text-lg 2xl:text-[20px]">
          Sign Up
        </span>
        <span></span>
      </button>

      <SocialAuth />
    </form>
  );
}
