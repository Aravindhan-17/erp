import Link from "next/link";
import { AuthBackground } from "../components/auth-background";
import { AuthHeader } from "../components/auth-header";
import { ForgotPasswordForm } from "./components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-background relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <AuthBackground variant="forgot" />

      {/* Main Layout Card */}
      <div className="max-w-212.5 z-10 flex w-full flex-col gap-8 rounded-3xl bg-white p-6 shadow-xl sm:gap-10 sm:p-10">
        <AuthHeader
          title="Forgot Password"
          subtitle="Enter your email and we will send you a link to reset your password."
        />

        <div className="max-w-192.5 mx-auto flex w-full flex-col items-center">
          <ForgotPasswordForm />

          {/* Back to Sign In Link */}
          <div className="max-w-192.5 h-7.5 mx-auto mt-8 flex w-full justify-center">
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/90 flex h-full w-full items-center justify-center text-center font-['Poppins'] text-[20px] font-semibold leading-none underline transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
