import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schema";
import { Eye, EyeOff } from "lucide-react";

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.warn("Reset password data:", data);
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4 lg:gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4 lg:gap-5">
        <div className="flex w-full flex-col gap-2 lg:gap-2.5">
          <label
            htmlFor="password"
            className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
          >
            New Password
          </label>
          <div className="relative h-10 w-full lg:h-11">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              {...register("password")}
              className={` h-full w-full rounded-lg border bg-white pl-4 pr-12 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-primary border-black/25"
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

        <div className="flex w-full flex-col gap-2 lg:gap-2.5">
          <label
            htmlFor="confirmPassword"
            className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
          >
            Confirm Password
          </label>
          <div className="relative h-10 w-full lg:h-11">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              {...register("confirmPassword")}
              className={` h-full w-full rounded-lg border bg-white pl-4 pr-12 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-primary border-black/25"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 transition-colors hover:text-black/50"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="font-['Poppins'] text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        id="reset-password-btn"
        className="bg-primary hover:bg-primary/90 mt-2 flex h-10 w-full items-center justify-center rounded-lg shadow-md transition-all lg:mt-4 lg:h-11"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">
          Reset Password
        </span>
      </button>
    </form>
  );
}
