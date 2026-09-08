import { Link } from "@tanstack/react-router";
import { AuthBackground } from "@/features/auth/components/auth-background";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { SignUpForm } from "@/features/auth/sign-up/components/sign-up-form";

export default function SignUp() {
  return (
    <div className="bg-background relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <AuthBackground />

      {/* Main Layout Card */}
      <div className="z-10 flex w-full max-w-md flex-col gap-6 rounded-3xl bg-white p-6 shadow-xl sm:max-w-lg sm:p-10 lg:max-w-xl lg:gap-8">
        <AuthHeader
          title="Create Your Account"
          subtitle="Join ERP Flash Deal and enjoy exclusive deals"
        />

        <SignUpForm />

        {/* already sign in layout */}
        <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-2 text-center">
          <span className="font-['Poppins'] text-sm font-semibold text-black sm:text-base">
            Already have an account?
          </span>
          <Link
            to="/auth/sign-in"
            id="link-to-login"
            className="text-primary hover:text-primary/90 font-['Poppins'] text-sm font-semibold underline transition-colors sm:text-base"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
