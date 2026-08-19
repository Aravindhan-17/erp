import Link from "next/link";
import { AuthBackground } from "../components/auth-background";
import { AuthHeader } from "../components/auth-header";
import { LoginForm } from "./components/login-form";

export default function StorefrontLoginPage() {
  return (
    <div className="bg-background relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <AuthBackground variant="login" />

      {/* Main Layout Card */}
      <div className="2xl:max-w-212.5 z-10 flex w-full max-w-xl flex-col gap-6 rounded-3xl bg-white p-6 shadow-xl sm:gap-10 sm:p-10 lg:max-w-3xl lg:gap-8">
        <AuthHeader title="Welcome Back!" subtitle="Sign in to your account" />

        <LoginForm />

        {/* Signup layout */}
        <div className="max-w-192.5 min-h-7.5 mx-auto flex w-full flex-wrap items-center justify-center gap-2 text-center sm:gap-2.5">
          <span className="min-h-7.5 flex w-auto items-center justify-center font-['Poppins'] text-[16px] font-semibold leading-tight text-black sm:w-auto sm:text-[20px] sm:leading-none">
            Don&apos;t have an account?
          </span>
          <Link
            href="/auth/register"
            id="link-to-register"
            className="min-h-7.5 text-primary flex w-auto items-center justify-center font-['Poppins'] text-[16px] font-semibold leading-tight underline sm:w-auto sm:text-[20px] sm:leading-none"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
