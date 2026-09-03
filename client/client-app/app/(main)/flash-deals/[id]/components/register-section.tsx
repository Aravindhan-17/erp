"use client";

import { useState } from "react";
import { ShieldCheck, Users, Package } from "lucide-react";
import PaymentPopup from "../../../../components/payment-popup";

export default function RegisterSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Registration Box */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-purple-100 bg-purple-50 p-4 sm:flex-row">
        <div className="flex items-start gap-3">
          <div className="text-primary mt-1 shrink-0 rounded-xl bg-white p-2 shadow-sm">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h4 className="font-bold text-gray-900">Register for this deal</h4>

            <p className="mt-0.5 text-xs text-gray-500">Pay just ₹1 to get early access.</p>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-primary w-full rounded-xl px-6 py-3 text-sm font-bold text-white sm:w-auto"
        >
          Register for ₹1
        </button>
      </div>

      <div className="flex items-center gap-6 text-[13px] font-medium text-gray-600">
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span className="font-bold">1,250</span>
          people have already registered
        </div>

        <div className="flex items-center gap-2">
          <Package size={16} />
          <span className="font-bold">120</span>
          Products
        </div>
      </div>

      <PaymentPopup open={open} onClose={() => setOpen(false)} />
    </>
  );
}
