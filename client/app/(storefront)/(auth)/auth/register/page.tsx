import Link from "next/link";
import { AuthBackground } from "../components/auth-background";
import { AuthHeader } from "../components/auth-header";
import { RegisterForm } from "./components/register-form";

export default function StorefrontRegisterPage() {
  return (
    <div className="bg-background relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <AuthBackground />

      {/* Main Layout Card */}
      <div className="z-10 flex w-full max-w-xl lg:max-w-3xl 2xl:max-w-212.5 flex-col gap-6 lg:gap-8 rounded-3xl bg-white p-6 shadow-xl sm:gap-10 sm:p-10">
        <AuthHeader
          title="Create Your Account"
          subtitle="Join ERP Flash Deal and enjoy exclusive deals"
        />

        <RegisterForm />

        {/* already sign in layout */}
        <div className="max-w-192.5 min-h-7.5 mx-auto flex w-full flex-wrap items-center justify-center gap-2 text-center sm:gap-2.5">
          <span className="sm:w-67 min-h-7.5 flex w-auto items-center justify-center font-['Poppins'] text-[16px] font-semibold leading-tight text-black sm:text-[20px] sm:leading-none">
            Already have an account?
          </span>
          <Link
            href="/auth/login"
            id="link-to-login"
            className="sm:w-17.25 min-h-7.5 text-primary flex w-auto items-center justify-center font-['Poppins'] text-[16px] font-semibold leading-tight underline sm:text-[20px] sm:leading-none"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
