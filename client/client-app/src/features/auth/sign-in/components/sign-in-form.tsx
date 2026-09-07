
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { SocialAuth } from "../../components/social-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "../schema";
import { useLogin } from "@/features/auth/api/sign-in";
import {  useNavigate  } from "@tanstack/react-router";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = (data: SignInFormData) => {
    login(data, {
      onSuccess: () => {
        navigate({ to: "/profile" });
      }
    });
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4 lg:gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Field layout */}
      <div className="max-w-192.5 flex w-full flex-col gap-4 lg:gap-5">
        <div className="grid grid-cols-1 gap-4 lg:gap-5">
          <div className="flex w-full max-w-full flex-col gap-2 lg:gap-2.5">
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

          <div className="flex w-full max-w-full flex-col gap-2 lg:gap-2.5">
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
        </div>

        <div className="mt-2 flex w-full items-center justify-between">
          <label className="group flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="text-primary h-4 w-4 cursor-pointer rounded border border-black/25 bg-white"
            />
            <span className="group-hover:text-primary font-['Poppins'] text-xs font-semibold text-black transition-colors sm:text-sm">
              Remember Me
            </span>
          </label>

          <Link
            to="/auth/forgot-password"
            className="text-primary font-['Poppins'] text-xs font-semibold transition-colors hover:underline sm:text-sm"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Button layout */}
      <button
        type="submit"
        id="login-submit-btn"
        disabled={isPending}
        className="bg-primary hover:bg-primary/90 mt-2 flex h-10 w-full items-center justify-center rounded-lg shadow-md transition-all lg:mt-4 lg:h-11 disabled:opacity-50"
      >
        <span className="font-['Poppins'] text-sm font-bold text-white sm:text-base">
          {isPending ? "Signing in..." : "Sign In"}
        </span>
      </button>

      <SocialAuth />
    </form>
  );
}
