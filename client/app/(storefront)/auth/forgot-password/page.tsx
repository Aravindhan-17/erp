"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [identifier, setIdentifier] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4" id="forgot-pwd-logo">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            ⚡
          </div>
          <span className="font-extrabold text-3xl tracking-tight text-primary">
            Flash<span className="text-secondary">Store</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          We will send a reset code or link to recover your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border border-border py-8 px-4 shadow-xl rounded-2xl sm:px-10 space-y-6">
          {!resetSent ? (
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 p-1 bg-muted rounded-xl border border-border">
                <button
                  type="button"
                  id="method-tab-phone"
                  onClick={() => setMethod("phone")}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    method === "phone"
                      ? "bg-background text-primary shadow-sm"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  Mobile OTP
                </button>
                <button
                  type="button"
                  id="method-tab-email"
                  onClick={() => setMethod("email")}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    method === "email"
                      ? "bg-background text-primary shadow-sm"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  Work Email
                </button>
              </div>

              {method === "phone" ? (
                <div>
                  <label htmlFor="reset-phone" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                    Registered Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 rounded-xl border border-border bg-muted text-sm font-semibold">
                      +91
                    </span>
                    <input
                      id="reset-phone"
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="reset-email" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                    Registered Work Email
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              <button
                type="submit"
                id="send-reset-btn"
                onClick={() => setResetSent(true)}
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg transition-all"
              >
                Send Reset Code 🔑
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-xs text-primary font-semibold text-center">
                Reset code sent to <strong>{identifier}</strong>
              </div>

              <div>
                <label htmlFor="reset-code" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                  Enter 6-Digit Code
                </label>
                <input
                  id="reset-code"
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                id="update-pwd-btn"
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-secondary hover:bg-secondary-hover rounded-xl shadow-lg transition-all"
              >
                Update Password & Sign In 🔒
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link href="/auth/login" id="back-to-login" className="text-xs font-bold text-foreground/70 hover:text-primary transition-colors">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
