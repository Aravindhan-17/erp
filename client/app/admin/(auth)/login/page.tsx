"use client";

import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-muted/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            ⚡
          </div>
          <span className="font-extrabold text-3xl tracking-tight text-primary">
            Admin<span className="text-secondary">Portal</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Admin Sign In
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Sign in to manage flash deals, vendors, and platform settings
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border border-border py-8 px-4 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="admin@flashstore.com"
                className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg transition-all mt-4"
            >
              Sign In to Admin Portal 🔒
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
