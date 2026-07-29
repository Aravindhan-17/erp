"use client";

import { useState } from "react";
import Link from "next/link";

export default function StorefrontLoginPage() {
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4" id="login-logo">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            ⚡
          </div>
          <span className="font-extrabold text-3xl tracking-tight text-primary">
            Flash<span className="text-secondary">Store</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Sign in to access your flash deals, cart holds & wallet
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border border-border py-8 px-4 shadow-xl rounded-2xl sm:px-10 space-y-6">
          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 p-1 bg-muted rounded-xl border border-border">
            <button
              type="button"
              id="role-tab-customer"
              onClick={() => setRole("customer")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === "customer"
                  ? "bg-background text-primary shadow-sm"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              B2C Shopper
            </button>
            <button
              type="button"
              id="role-tab-vendor"
              onClick={() => setRole("vendor")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === "vendor"
                  ? "bg-background text-primary shadow-sm"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Vendor ERP Admin
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {role === "customer" ? (
              <>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 rounded-xl border border-border bg-muted text-sm font-semibold">
                      +91
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label htmlFor="otp" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                      Enter 6-Digit OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  id="submit-otp-btn"
                  onClick={() => setOtpSent(true)}
                  className="w-full py-3.5 px-4 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg transition-all"
                >
                  {otpSent ? "Verify OTP & Sign In" : "Send OTP 📲"}
                </button>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="admin@vendor.com"
                    className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                      Password
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      id="link-forgot-password"
                      className="text-xs font-semibold text-secondary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
                  id="vendor-login-btn"
                  className="w-full py-3.5 px-4 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg transition-all"
                >
                  Sign In to ERP Dashboard 🔒
                </button>
              </>
            )}
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-foreground/70">
              Don&apos;t have an account yet?{" "}
              <Link href="/auth/register" id="link-to-register" className="font-bold text-secondary hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
