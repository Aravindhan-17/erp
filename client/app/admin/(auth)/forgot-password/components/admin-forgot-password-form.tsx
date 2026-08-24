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
            className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-slate-800"
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
            className="focus:ring-slate-900 h-10 w-full rounded-lg border border-slate-300 bg-white/80 px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 lg:h-11 transition-all"
          />
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        className="bg-slate-900 hover:bg-slate-800 hover:shadow-lg mt-2 flex h-10 w-full items-center justify-center rounded-lg shadow-md transition-all lg:mt-4 lg:h-11"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">
          Send Secure Reset Link
        </span>
      </button>

      {/* Back to Login Link */}
      <div className="mx-auto mt-4 flex w-full justify-center">
        <Link
          href="/admin/login"
          className="text-slate-800 hover:text-slate-600 font-['Poppins'] text-sm font-semibold underline transition-colors sm:text-base"
        >
          Back to Secure Login
        </Link>
      </div>
    </form>
  );
}
