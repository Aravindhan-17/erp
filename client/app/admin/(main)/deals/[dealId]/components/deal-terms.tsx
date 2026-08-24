import React from 'react';

export function DealTerms() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          Terms shown to shoppers
        </h2>
        <p className="text-sm text-gray-500">
          Eligibility, purchase requirements, reservation & cancellation policy.
        </p>
      </div>

      <textarea
        defaultValue="Minimum order value of ₹5,000, or 2 products totalling ₹5,000, is required. Cart items are reserved for 10 minutes. Unpaid reservations return to stock automatically. Registration fee is non-refundable."
        rows={3}
        className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-700 outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
      />
    </section>
  );
}
