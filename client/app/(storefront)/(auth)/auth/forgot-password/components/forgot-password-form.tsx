"use client";

import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  return (
    <form className="flex w-full flex-col items-center gap-4 lg:gap-6" onSubmit={(e) => e.preventDefault()}>
      {/* Field layout */}
      <div className="max-w-192.5 flex w-full flex-col gap-4 lg:gap-5">
        <div className="flex w-full max-w-full flex-col gap-2 lg:gap-2.5">
          <label
            htmlFor="email"
            className="flex w-full items-center font-['Poppins'] text-base xl:text-lg 2xl:text-[20px] font-semibold leading-none text-black"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 lg:h-14 2xl:h-17.5 focus:ring-primary w-full rounded-lg border border-black/25 bg-white px-4 2xl:p-5 font-['Poppins'] text-base xl:text-lg 2xl:text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        id="send-reset-btn"
        className="max-w-192.5 h-12 lg:h-14 2xl:h-17.5 bg-primary hover:bg-primary/90 mt-2 lg:mt-4 flex w-full items-center justify-between rounded-lg px-4 2xl:p-5 shadow-md transition-all"
      >
        <span></span>
        <span className="flex items-center justify-center font-['Poppins'] text-base xl:text-lg 2xl:text-[20px] font-bold leading-none text-white">
          Send Reset Link
        </span>
        <span></span>
      </button>
    </form>
  );
}
