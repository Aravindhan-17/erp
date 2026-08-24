import { AdminAuthBackground } from "../components/admin-auth-background";
import { AuthHeader } from "@/app/(storefront)/(auth)/components/auth-header";
import { AdminForgotPasswordForm } from "./components/admin-forgot-password-form";

export default function AdminForgotPasswordPage() {
  return (
    <div className="bg-background relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <AdminAuthBackground />

      {/* Main Layout Card with Glassmorphism for premium look */}
      <div className="z-10 flex w-full max-w-md flex-col gap-6 rounded-3xl bg-white/95 backdrop-blur-md p-6 shadow-2xl border border-white/20 sm:max-w-lg sm:p-10 lg:max-w-xl lg:gap-8">
        <AuthHeader
          title="Admin Recovery"
          subtitle="Enter your verified admin email to reset your credentials."
        />
        <div className="mx-auto flex w-full flex-col items-center">
          <AdminForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
