
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { SocialAuth } from "../../components/social-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "../schema";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.warn("Register data:", data);
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4 lg:gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Field layout */}
      <div className="flex w-full flex-col gap-4 lg:gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="firstName"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              {...register("firstName")}
              className={` h-10 w-full rounded-lg border bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-primary border-black/25"
              }`}
            />
            {errors.firstName && (
              <span className="font-['Poppins'] text-xs text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="lastName"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              {...register("lastName")}
              className={` h-10 w-full rounded-lg border bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-primary border-black/25"
              }`}
            />
            {errors.lastName && (
              <span className="font-['Poppins'] text-xs text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="email"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={` h-10 w-full rounded-lg border bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-primary border-black/25"
              }`}
            />
            {errors.email && (
              <span className="font-['Poppins'] text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="phone"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
            >
              Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your mobile number"
              {...register("phone")}
              className={` h-10 w-full rounded-lg border bg-white px-4 font-['Poppins'] text-sm text-gray-900 placeholder:text-black/50 focus:outline-none focus:ring-2 lg:h-11 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-primary border-black/25"
              }`}
            />
            {errors.phone && (
              <span className="font-['Poppins'] text-xs text-red-500">{errors.phone.message}</span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 lg:gap-2.5">
            <label
              htmlFor="password"
              className="flex w-full items-center font-['Poppins'] text-sm font-semibold text-black"
            >
              Password
            </label>
            <div className="relative h-10 w-full lg:h-11">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                placeholder="Re-enter your password"
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

        <div className="mt-auto flex w-full flex-col items-start pt-2 sm:items-center">
          <div className="flex w-full items-start gap-2">
            <div className="flex shrink-0 items-center justify-center">
              <input
                type="checkbox"
                id="agree"
                {...register("agreeTerms")}
                className={`text-primary h-4 w-4 cursor-pointer rounded border bg-white lg:h-5 lg:w-5 ${
                  errors.agreeTerms
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-primary border-black/25"
                }`}
              />
            </div>
            <label htmlFor="agree" className="flex cursor-pointer flex-wrap items-center gap-1">
              <span className="font-['Poppins'] text-xs font-semibold text-black sm:text-sm">
                I agree to the
              </span>
              <Link
                to="/"
                className="text-primary hover:text-primary/90 font-['Poppins'] text-xs font-semibold underline transition-colors sm:text-sm"
              >
                Terms & Conditions
              </Link>
              <span className="font-['Poppins'] text-xs font-semibold text-black sm:text-sm">
                and
              </span>
              <Link
                to="/"
                className="text-primary hover:text-primary/90 font-['Poppins'] text-xs font-semibold underline transition-colors sm:text-sm"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeTerms && (
            <span className="mt-1 font-['Poppins'] text-xs text-red-500 sm:ml-6">
              {errors.agreeTerms.message}
            </span>
          )}
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        id="register-submit-btn"
        className="bg-primary hover:bg-primary/90 mt-2 flex h-10 w-full items-center justify-center rounded-lg shadow-md transition-all lg:mt-4 lg:h-11"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">Sign Up</span>
      </button>

      <SocialAuth />
    </form>
  );
}
