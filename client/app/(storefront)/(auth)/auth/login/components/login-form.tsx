"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { SocialAuth } from "../../components/social-auth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <form className="flex w-full flex-col items-center gap-6" onSubmit={(e) => e.preventDefault()}>
      {/* Field layout */}
      <div className="max-w-192.5 flex min-h-[auto] w-full flex-col gap-5">
        <div className="grid grid-cols-1 gap-5">
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-17.5 focus:ring-primary w-full rounded-lg border border-black/25 bg-white p-5 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="h-27.5 flex w-full max-w-full flex-col gap-2.5">
            <label
              htmlFor="password"
              className="h-7.5 flex w-full items-center font-['Poppins'] text-[20px] font-semibold leading-none text-black"
            >
              Password
            </label>
            <div className="h-17.5 relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-primary h-full w-full rounded-lg border border-black/25 bg-white py-5 pl-5 pr-12 font-['Poppins'] text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-black/25 transition-colors hover:text-black/50"
              >
                {showPassword ? <EyeOff className="h-8 w-8" /> : <Eye className="h-8 w-8" />}
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
              className="text-primary focus:ring-primary h-6 w-6 cursor-pointer rounded border border-black/25 bg-white"
            />
            <span className="group-hover:text-primary font-['Poppins'] text-[16px] font-semibold leading-tight text-black transition-colors sm:text-[20px]">
              Remember Me
            </span>
          </label>

          <Link
            href="/auth/forgot-password"
            className="text-primary font-['Poppins'] text-[16px] font-semibold leading-tight transition-colors hover:underline sm:text-[20px]"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        id="login-submit-btn"
        className="max-w-192.5 h-17.5 bg-primary hover:bg-primary/90 mt-4 flex w-full items-center justify-between rounded-lg p-5 shadow-md transition-all"
      >
        <span></span>
        <span className="h-7.5 flex w-auto items-center justify-center font-['Poppins'] text-[20px] font-bold leading-none text-white">
          Sign In
        </span>
        <span></span>
      </button>

      <SocialAuth />
    </form>
  );
}
