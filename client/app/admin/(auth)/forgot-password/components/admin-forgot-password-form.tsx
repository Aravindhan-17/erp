"use client";

import { useState } from "react";
import Link from "next/link";

export function AdminForgotPasswordForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="flex w-full flex-col items-center gap-4 lg:gap-6"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Field layout */}
      <div className="flex w-full flex-col gap-4 lg:gap-5">
        <div className="flex w-full max-w-full flex-col gap-2 lg:gap-2.5">
          <label
            htmlFor="email"
            className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
          >
            Admin Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="admin@flashstore.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:ring-primary h-10 w-full rounded-lg border border-black/25 bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11"
          />
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        className="bg-primary hover:bg-primary/90 mt-2 flex h-10 w-full items-center justify-center rounded-lg shadow-md transition-all lg:mt-4 lg:h-11"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">
          Send Secure Reset Link
        </span>
      </button>

      {/* Back to Login Link */}
      <div className="mx-auto mt-4 flex w-full justify-center">
        <Link
          href="/admin/login"
          className="text-primary font-['Poppins'] text-sm font-semibold transition-colors hover:underline sm:text-base"
        >
          Back to Secure Login
        </Link>
      </div>
    </form>
  );
}
