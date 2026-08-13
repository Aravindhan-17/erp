"use client";

import { useEffect, useState } from "react";
import { Check, Lock, ShieldCheck, Banknote } from "lucide-react";
import Link from "next/link";

interface ProcessingViewProps {
  onSuccess: (orderId: string) => void;
  onFail: () => void;
}

export function ProcessingView({ onSuccess, onFail }: ProcessingViewProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Verifying Payment", "Processing", "Confirming", "Finalizing"];

  useEffect(() => {
    // Simulate the payment process steps
    const timers = [
      setTimeout(() => setCurrentStep(1), 1000),
      setTimeout(() => setCurrentStep(2), 2000),
      setTimeout(() => setCurrentStep(3), 3000),
      setTimeout(() => {
        // Randomly succeed or fail (90% success rate for demo)
        if (Math.random() > 0.1) {
          onSuccess(`RFG${Math.floor(Math.random() * 1000000)}`);
        } else {
          onFail();
        }
      }, 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onSuccess, onFail]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2d2a4a] p-4 sm:p-8">
      {/* Breadcrumbs - Abs pos at top left */}
      <div className="absolute left-8 top-8 hidden items-center gap-2 text-sm text-gray-300 sm:flex">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span>&gt;</span>
        <Link href="/flash-deals" className="hover:text-white">
          Flash Deals
        </Link>
        <span>&gt;</span>
        <span className="text-white">Registration</span>
      </div>

      <div className="rounded-4xl relative w-full max-w-2xl bg-white p-8 pt-16 text-center shadow-2xl sm:p-12 sm:pt-20">
        {/* Shield Icon at top center */}
        <div className="absolute -top-12 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-3xl border-4 border-[#2d2a4a] bg-purple-100 shadow-xl">
          <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-2xl text-white">
            <span className="text-3xl font-bold">₹</span>
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Processing Your Payment
        </h1>
        <p className="mb-12 text-gray-500">Please do not close or refresh this page.</p>

        {/* Stepper */}
        <div className="relative mb-16 flex justify-between">
          {/* Connecting line */}
          <div className="absolute left-0 top-6 h-0.5 w-full bg-gray-200" />

          {/* Active connecting line */}
          <div
            className="bg-primary absolute left-0 top-6 h-0.5 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white transition-colors ${
                    isCompleted
                      ? "border-primary bg-primary text-white"
                      : isCurrent
                        ? "border-primary text-primary"
                        : "border-gray-200 text-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} strokeWidth={3} />
                  ) : (
                    <div
                      className={`h-3 w-3 rounded-full ${isCurrent ? "bg-primary" : "bg-gray-200"}`}
                    />
                  )}
                </div>
                <p
                  className={`text-sm font-semibold sm:text-base ${isCurrent || isCompleted ? "text-primary" : "text-gray-400"}`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>

        {/* Spinner */}
        <div className="mb-6 flex justify-center">
          <div className="border-t-primary h-16 w-16 animate-spin rounded-full border-4 border-gray-100" />
        </div>

        <p className="text-lg font-medium text-gray-600">This will only take a few seconds...</p>
        <p className="mt-2 text-xl font-bold text-gray-900">Amount: ₹1</p>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex w-full max-w-2xl flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row">
        <div className="flex items-center gap-3 text-white">
          <Lock size={32} className="opacity-80" />
          <div>
            <p className="font-bold">Secure Payment</p>
            <p className="text-xs text-gray-300">100% Protected</p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-white/10 sm:block" />

        <div className="flex items-center gap-3 text-white">
          <ShieldCheck size={32} className="opacity-80" />
          <div>
            <p className="font-bold">PCI DSS</p>
            <p className="text-xs text-gray-300">Certified</p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-white/10 sm:block" />

        <div className="flex items-center gap-3 text-white">
          <Banknote size={32} className="opacity-80" />
          <div>
            <p className="font-bold">RBI Compliant</p>
            <p className="text-xs text-gray-300">Safe & Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
