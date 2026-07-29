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
    <form className="flex w-full flex-col items-center gap-4 lg:gap-6" onSubmit={(e) => e.preventDefault()}>
      {/* Field layout */}
      <div className="max-w-192.5 flex w-full flex-col gap-4 lg:gap-5">
        <div className="grid grid-cols-1 gap-4 lg:gap-5">
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 lg:h-14 2xl:h-17.5 focus:ring-primary w-full rounded-lg border border-black/25 bg-white px-4 2xl:p-5 font-['Poppins'] text-base xl:text-lg 2xl:text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="flex w-full max-w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="password"
              className="flex w-full items-center font-['Poppins'] text-base xl:text-lg 2xl:text-[20px] font-semibold leading-none text-black"
            >
              Password
            </label>
            <div className="h-12 lg:h-14 2xl:h-17.5 relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-primary h-full w-full rounded-lg border border-black/25 bg-white pl-4 pr-12 2xl:pl-5 font-['Poppins'] text-base xl:text-lg 2xl:text-[20px] leading-none text-gray-900 placeholder:font-['Poppins'] placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-[20px] placeholder:font-normal placeholder:leading-none placeholder:text-black/50 focus:outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 transition-colors hover:text-black/50"
              >
                {showPassword ? <EyeOff className="h-5 w-5 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8" /> : <Eye className="h-5 w-5 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8" />}
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
              className="text-primary focus:ring-primary h-5 w-5 2xl:h-6 2xl:w-6 cursor-pointer rounded border border-black/25 bg-white"
            />
            <span className="group-hover:text-primary font-['Poppins'] text-sm sm:text-base 2xl:text-[20px] font-semibold leading-tight text-black transition-colors">
              Remember Me
            </span>
          </label>

          <Link
            href="/auth/forgot-password"
            className="text-primary font-['Poppins'] text-sm sm:text-base 2xl:text-[20px] font-semibold leading-tight transition-colors hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        id="login-submit-btn"
        className="max-w-192.5 h-12 lg:h-14 2xl:h-17.5 bg-primary hover:bg-primary/90 mt-2 lg:mt-4 flex w-full items-center justify-between rounded-lg px-4 2xl:p-5 shadow-md transition-all"
      >
        <span></span>
        <span className="flex w-auto items-center justify-center font-['Poppins'] text-base xl:text-lg 2xl:text-[20px] font-bold leading-none text-white">
          Sign In
        </span>
        <span></span>
      </button>

      <SocialAuth />
    </form>
  );
}
