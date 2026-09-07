import { Link } from "@tanstack/react-router";
import { AuthBackground } from "@/features/auth/components/auth-background";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { ForgotPasswordForm } from "@/features/auth/forgot-password/components/forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className="bg-background relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <AuthBackground variant="forgot" />

      {/* Main Layout Card */}
      <div className="z-10 flex w-full max-w-md flex-col gap-6 rounded-3xl bg-white p-6 shadow-xl sm:max-w-lg sm:p-10 lg:max-w-xl lg:gap-8">
        <AuthHeader
          title="Forgot Password"
          subtitle="Enter your email and we will send you a link to reset your password."
        />

        <div className="mx-auto flex w-full flex-col items-center">
          <ForgotPasswordForm />

          {/* Back to Sign In Link */}
          <div className="mx-auto mt-6 flex w-full justify-center">
            <Link
              to="/auth/sign-in"
              className="text-primary hover:text-primary/90 font-['Poppins'] text-sm font-semibold underline transition-colors sm:text-base"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
