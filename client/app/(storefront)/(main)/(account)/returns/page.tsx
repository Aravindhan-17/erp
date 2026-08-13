"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product1 } from "@/assets/images";
import { Search, RefreshCw, CheckCircle2, Clock, XCircle, FileText } from "lucide-react";

export default function ReturnsPage() {
  const [returns] = useState([
    {
      id: "RET-1192-3029",
      orderId: "ORD-1192-3029",
      date: "Jul 20, 2026",
      status: "Approved",
      refundAmount: "$12.50",
      refundMethod: "Original Payment Method (Visa ending in 4242)",
      item: { name: "USB-C Fast Charging Cable", image: Product1, qty: 1 },
      reason: "No longer needed",
    },
  ]);

  const getReturnStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 size={18} className="text-green-600" />;
      case "Pending":
        return <Clock size={18} className="text-amber-600" />;
      case "Rejected":
        return <XCircle size={18} className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns & Cancellations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track the status of your return requests and refunds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="group relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search returns"
              className="focus:border-secondary focus:ring-secondary w-full rounded-xl border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-1 sm:w-64"
            />
          </div>
          <button className="bg-primary flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            Search Returns
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {returns.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
            <RefreshCw size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">No Returns Found</h3>
            <p className="mt-2 text-sm text-gray-500">
              You haven&apos;t requested any returns or cancellations.
            </p>
            <Link
              href="/orders"
              className="bg-secondary hover:bg-secondary/90 mt-6 inline-flex rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all"
            >
              View Your Orders
            </Link>
          </div>
        ) : (
          returns.map((req) => (
            <div
              key={req.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex flex-col justify-between gap-6 border-b border-gray-200 bg-gray-50/80 p-5 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Return Requested
                    </p>
                    <p className="text-sm font-medium text-gray-900">{req.date}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Refund Amount
                    </p>
                    <p className="text-sm font-medium text-gray-900">{req.refundAmount}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Return ID # {req.id}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    Order #{" "}
                    <Link
                      href={`/orders/${req.orderId}`}
                      className="text-secondary hover:underline"
                    >
                      {req.orderId}
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-8 p-6 md:flex-row">
                <div className="flex flex-1 gap-6 border-r border-gray-100 pr-8">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2">
                    <Image
                      src={req.item.image}
                      alt={req.item.name}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">{req.item.name}</h3>
                    <p className="mb-4 text-sm text-gray-500">Reason: {req.reason}</p>
                    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5">
                      {getReturnStatusIcon(req.status)}
                      <span className="text-sm font-semibold text-gray-900">
                        Return {req.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full shrink-0 flex-col gap-4 md:w-64">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Refund Status
                    </p>
                    <p className="text-sm text-gray-900">Refund issued to {req.refundMethod}</p>
                  </div>

                  <div className="mt-2 flex flex-col gap-2">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                      <FileText size={16} />
                      View Return Label
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
