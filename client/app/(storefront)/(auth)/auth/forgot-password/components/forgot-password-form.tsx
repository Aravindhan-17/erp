"use client";

import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  return (
    <form className="flex w-full flex-col items-center gap-6" onSubmit={(e) => e.preventDefault()}>
      {/* Field layout */}
      <div className="max-w-192.5 flex min-h-[auto] w-full flex-col gap-5">
        <div className="h-27.5 flex w-full max-w-full flex-col gap-2.5">
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
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-17.5 focus:ring-primary w-full rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        id="send-reset-btn"
        className="max-w-192.5 h-17.5 bg-primary hover:bg-primary/90 mt-4 flex w-full items-center justify-between rounded-lg p-5 shadow-md transition-all"
      >
        <span></span>
        <span className="h-7.5 flex w-auto items-center justify-center font-['Poppins'] text-[20px] font-bold leading-none text-white">
          Send Reset Link
        </span>
        <span></span>
      </button>
    </form>
  );
}
