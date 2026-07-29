import Link from "next/link";
import { AuthBackground } from "../components/auth-background";
import { AuthHeader } from "../components/auth-header";
import { RegisterForm } from "./components/register-form";

export default function StorefrontRegisterPage() {
  return (
    <div className="min-h-screen bg-background isolate flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AuthBackground />

      {/* Main Layout Card */}
      <div className="z-10 w-full max-w-212.5 bg-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col gap-8 sm:gap-10">
        <AuthHeader 
          title="Create Your Account" 
          subtitle="Join ERP Flash Deal and enjoy exclusive deals" 
        />

        <RegisterForm />

        {/* already sign in layout */}
        <div className="w-full max-w-192.5 mx-auto min-h-7.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-center">
          <span className="w-auto sm:w-67 min-h-7.5 font-['Poppins'] font-semibold text-[16px] sm:text-[20px] leading-tight sm:leading-none text-black flex items-center justify-center">
            Already have an account?
          </span>
          <Link href="/auth/login" id="link-to-login" className="w-auto sm:w-17.25 min-h-7.5 font-['Poppins'] font-semibold text-[16px] sm:text-[20px] leading-tight sm:leading-none text-primary underline flex items-center justify-center">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
