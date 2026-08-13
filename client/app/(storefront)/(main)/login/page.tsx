import { Metadata } from "next";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Log in — FlashERP",
  description: "Log in to your FlashERP account.",
};

export default function LoginPage() {
  return (
    <div className="font-poppins relative mx-auto flex w-full max-w-[1920px] flex-col items-center justify-center px-4 py-16 md:px-8 md:py-24 xl:px-10">
      <div className="max-w-125 w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">Welcome Back</h1>
          <p className="text-sm font-medium text-gray-500">
            Log in to access your dashboard and exclusive deals.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-[1.25rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <form className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition-colors focus:bg-white focus:ring-1"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link href="#" className="text-primary text-xs font-bold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition-colors focus:bg-white focus:ring-1"
                  required
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="remember"
                type="checkbox"
                className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="remember" className="text-sm font-medium text-gray-700">
                Keep me logged in
              </label>
            </div>

            <button
              type="button"
              className="bg-primary mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Log in
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative mt-8 flex items-center justify-center">
            <span className="absolute bg-white px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Or continue with
            </span>
            <div className="w-full border-t border-gray-200"></div>
          </div>

          {/* Social Logins */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
            >
              {/* Minimal Google G logo */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              {/* Apple logo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Apple
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm font-medium text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-primary-hover font-bold transition-colors hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
