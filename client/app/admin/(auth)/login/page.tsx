import { AdminAuthBackground } from "../components/admin-auth-background";
import { AuthHeader } from "@/app/(storefront)/(auth)/components/auth-header";
import { AdminLoginForm } from "./components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div className="bg-background relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <AdminAuthBackground />

      {/* Main Layout Card with Glassmorphism for premium look */}
      <div className="z-10 flex w-full max-w-md flex-col gap-6 rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:max-w-lg sm:p-10 lg:max-w-xl lg:gap-8">
        <AuthHeader title="Admin Portal" subtitle="Sign in to manage the platform" />
        <AdminLoginForm />
      </div>
    </div>
  );
}
