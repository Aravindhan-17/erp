"use client";

import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="bg-muted/30 flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="mb-4 inline-flex items-center gap-2">
          <div className="from-primary flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-tr to-purple-600 text-2xl font-bold text-white shadow-lg">
            ⚡
          </div>
          <span className="text-primary text-3xl font-extrabold tracking-tight">
            Admin<span className="text-secondary">Portal</span>
          </span>
        </Link>
        <h2 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
          Admin Sign In
        </h2>
        <p className="text-foreground/70 mt-2 text-sm">
          Sign in to manage flash deals, vendors, and platform settings
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border-border rounded-2xl border px-4 py-8 shadow-xl sm:px-10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="text-foreground/80 mb-2 block text-xs font-bold uppercase tracking-wider"
              >
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="admin@flashstore.com"
                className="border-border bg-background text-foreground focus:ring-primary w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-foreground/80 mb-2 block text-xs font-bold uppercase tracking-wider"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="border-border bg-background text-foreground focus:ring-primary w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover mt-4 w-full rounded-xl px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all"
            >
              Sign In to Admin Portal 🔒
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
