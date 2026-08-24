"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <form
      className="flex w-full flex-col items-center gap-4 lg:gap-6"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Field layout */}
      <div className="flex w-full flex-col gap-4 lg:gap-5">
        <div className="grid grid-cols-1 gap-4 lg:gap-5">
          <div className="flex w-full max-w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="email"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-slate-800"
            >
              Admin Email
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

          <div className="flex w-full max-w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="password"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-slate-800"
            >
              Password
            </label>
            <div className="relative h-10 w-full lg:h-11">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-slate-900 h-full w-full rounded-lg border border-slate-300 bg-white/80 pl-4 pr-12 font-['Poppins'] text-sm text-gray-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 transition-colors hover:text-black/50"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 flex w-full items-center justify-between">
          <label className="group flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="text-slate-900 focus:ring-slate-900 h-4 w-4 cursor-pointer rounded border border-slate-300 bg-white"
            />
            <span className="group-hover:text-slate-700 font-['Poppins'] text-xs font-semibold text-slate-800 transition-colors sm:text-sm">
              Remember Me
            </span>
          </label>

          <Link
            href="/admin/forgot-password"
            className="text-slate-800 font-['Poppins'] text-xs font-semibold transition-colors hover:text-slate-600 hover:underline sm:text-sm"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        className="bg-slate-900 hover:bg-slate-800 hover:shadow-lg mt-2 flex h-10 w-full items-center justify-center rounded-lg shadow-md transition-all lg:mt-4 lg:h-11"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">
          Sign In to Portal
        </span>
      </button>
    </form>
  );
}
