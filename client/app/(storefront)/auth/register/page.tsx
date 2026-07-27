"use client";

import { useState } from "react";
import Link from "next/link";

export default function StorefrontRegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isVendor, setIsVendor] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4" id="register-logo">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            ⚡
          </div>
          <span className="font-extrabold text-3xl tracking-tight text-primary">
            Flash<span className="text-secondary">Store</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Create an Account
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Join to participate in time-boxed flash deals & access your wallet
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border border-border py-8 px-4 shadow-xl rounded-2xl sm:px-10 space-y-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="reg-phone" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                Mobile Number (for OTP & Deal Alerts)
              </label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 rounded-xl border border-border bg-muted text-sm font-semibold">
                  +91
                </span>
                <input
                  id="reg-phone"
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                required
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs font-bold text-foreground/80">Registering as a Vendor Merchant?</span>
              <button
                type="button"
                id="toggle-vendor-register"
                onClick={() => setIsVendor(!isVendor)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  isVendor ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    isVendor ? "left-5" : "left-1"
                  }`}
                />
              </button>
            </div>

            {isVendor && (
              <div className="space-y-4 pt-2">
                <div>
                  <label htmlFor="gstin" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                    GSTIN Number
                  </label>
                  <input
                    id="gstin"
                    type="text"
                    placeholder="22AAAAA0000A1Z5"
                    className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              id="register-submit-btn"
              className="w-full py-3.5 px-4 text-sm font-bold text-white bg-secondary hover:bg-secondary-hover rounded-xl shadow-lg transition-all"
            >
              Complete Registration 🚀
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-foreground/70">
              Already have an account?{" "}
              <Link href="/auth/login" id="link-to-login" className="font-bold text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
