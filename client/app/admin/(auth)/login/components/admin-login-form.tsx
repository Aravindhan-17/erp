"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Admin login data:", data);
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4 lg:gap-6"
      onSubmit={handleSubmit(onSubmit)}
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
              placeholder="admin@flashstore.com"
              {...register("email")}
              className={` h-10 w-full rounded-lg border bg-white/80 px-4 font-['Poppins'] text-sm text-gray-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 lg:h-11 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:ring-slate-900"
              }`}
            />
            {errors.email && (
              <span className="font-['Poppins'] text-xs text-red-500">{errors.email.message}</span>
            )}
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
                placeholder="Enter your password"
                {...register("password")}
                className={` h-full w-full rounded-lg border bg-white/80 pl-4 pr-12 font-['Poppins'] text-sm text-gray-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-slate-900"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 transition-colors hover:text-black/50"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <span className="font-['Poppins'] text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 flex w-full items-center justify-between">
          <label className="group flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 cursor-pointer rounded border border-slate-300 bg-white text-slate-900"
            />
            <span className="font-['Poppins'] text-xs font-semibold text-slate-800 transition-colors group-hover:text-slate-700 sm:text-sm">
              Remember Me
            </span>
          </label>

          <Link
            href="/admin/forgot-password"
            className="font-['Poppins'] text-xs font-semibold text-slate-800 transition-colors hover:text-slate-600 hover:underline sm:text-sm"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        className="mt-2 flex h-10 w-full items-center justify-center rounded-lg bg-slate-900 shadow-md transition-all hover:bg-slate-800 hover:shadow-lg lg:mt-4 lg:h-11"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">
          Sign In to Portal
        </span>
      </button>
    </form>
  );
}
