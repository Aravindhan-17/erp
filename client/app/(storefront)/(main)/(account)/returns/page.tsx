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
    }
  ]);

  const getReturnStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle2 size={18} className="text-green-600" />;
      case "Pending": return <Clock size={18} className="text-amber-600" />;
      case "Rejected": return <XCircle size={18} className="text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns & Cancellations</h1>
          <p className="text-sm text-gray-500 mt-1">Track the status of your return requests and refunds.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search returns"
              className="w-full sm:w-64 rounded-xl border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            Search Returns
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {returns.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
            <RefreshCw size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Returns Found</h3>
            <p className="mt-2 text-sm text-gray-500">You haven't requested any returns or cancellations.</p>
            <Link href="/orders" className="mt-6 inline-flex rounded-xl bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-secondary/90">
              View Your Orders
            </Link>
          </div>
        ) : (
          returns.map((req) => (
            <div key={req.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-200 bg-gray-50/80 p-5">
                <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Return Requested</p>
                    <p className="text-sm font-medium text-gray-900">{req.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Refund Amount</p>
                    <p className="text-sm font-medium text-gray-900">{req.refundAmount}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Return ID # {req.id}</p>
                  <p className="text-sm font-medium text-gray-500 mt-1">Order # <Link href={`/orders/${req.orderId}`} className="text-secondary hover:underline">{req.orderId}</Link></p>
                </div>
              </div>

              <div className="p-6 flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex gap-6 border-r border-gray-100 pr-8">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2">
                    <Image src={req.item.image} alt={req.item.name} className="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{req.item.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">Reason: {req.reason}</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 border border-gray-200">
                      {getReturnStatusIcon(req.status)}
                      <span className="text-sm font-semibold text-gray-900">Return {req.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Refund Status</p>
                    <p className="text-sm text-gray-900">Refund issued to {req.refundMethod}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    <button className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
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
