"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";

export function AdminForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Admin forgot password data:", data);
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4 lg:gap-6"
      onSubmit={handleSubmit(onSubmit)}
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
      </div>

      {/* Button layout */}
      <button
        type="submit"
        className="mt-2 flex h-10 w-full items-center justify-center rounded-lg bg-slate-900 shadow-md transition-all hover:bg-slate-800 hover:shadow-lg lg:mt-4 lg:h-11"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">
          Send Secure Reset Link
        </span>
      </button>

      {/* Back to Login Link */}
      <div className="mx-auto mt-4 flex w-full justify-center">
        <Link
          href="/admin/login"
          className="font-['Poppins'] text-sm font-semibold text-slate-800 underline transition-colors hover:text-slate-600 sm:text-base"
        >
          Back to Secure Login
        </Link>
      </div>
    </form>
  );
}
