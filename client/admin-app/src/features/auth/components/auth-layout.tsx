import { Outlet } from "@tanstack/react-router";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-slate-950">
      {/* Left Side - Animated Gradient Background */}
      <div className="relative hidden w-1/2 overflow-hidden bg-slate-900 lg:block">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-700 to-slate-900 opacity-90" />
        
        {/* Abstract shapes / lighting */}
        <div className="absolute -left-1/4 -top-1/4 h-200 w-200 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-150 w-150 rounded-full bg-indigo-500/30 blur-[100px]" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-20">
          <h1 className="text-4xl font-bold tracking-tight text-white xl:text-5xl">
            Welcome to FlashERP
          </h1>
          <p className="mt-6 text-lg text-slate-200">
            The ultimate admin dashboard for managing products, real-time flash deals, and order fulfillment.
          </p>
        </div>
      </div>

      {/* Right Side - Render the specific auth form (Login, Forgot Password, etc) */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 lg:px-24 xl:px-32">
        <Outlet />
      </div>
    </div>
  )
}
