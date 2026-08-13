"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product1, Product2, Product3 } from "@/assets/images";
import { Search, RefreshCw, ChevronDown } from "lucide-react";

export default function OrdersPage() {
  const [filterPeriod, setFilterPeriod] = useState("past_3_months");

  const [orders] = useState([
    {
      id: "ORD-7392-4821",
      date: "Aug 10, 2026",
      status: "Delivered",
      deliveryMessage: "Delivered Aug 12, 2026",
      total: "$245.00",
      shipTo: "John Doe",
      items: [
        { name: "Wireless Noise-Canceling Headphones", image: Product1, qty: 1, price: "$199.00", returnEligible: "Return eligible through Sep 11, 2026" },
        { name: "Premium Leather Watch Band", image: Product2, qty: 1, price: "$46.00", returnEligible: "Return eligible through Sep 11, 2026" },
      ],
    },
    {
      id: "ORD-2941-8573",
      date: "Aug 02, 2026",
      status: "Shipped",
      deliveryMessage: "Arriving tomorrow by 8 PM",
      total: "$89.99",
      shipTo: "John Doe",
      items: [
        { name: "Smart Home Security Camera", image: Product3, qty: 1, price: "$89.99", returnEligible: "Return window opens after delivery" },
      ],
    },
  ]);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Check the status of recent orders, manage returns, and discover similar products.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search all orders"
              className="w-full sm:w-64 rounded-xl border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            Search Orders
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-gray-900">{orders.length} orders</span>
        <span className="text-gray-500">placed in</span>
        <div className="relative">
          <select 
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-3 pr-8 text-sm font-medium text-gray-900 outline-none hover:bg-gray-100 focus:border-secondary focus:ring-1 focus:ring-secondary cursor-pointer"
          >
            <option value="past_30_days">past 30 days</option>
            <option value="past_3_months">past 3 months</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-200 bg-gray-50/80 p-5">
              <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order Placed</p>
                  <p className="text-sm font-medium text-gray-900">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total</p>
                  <p className="text-sm font-medium text-gray-900">{order.total}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Ship To</p>
                  <p className="text-sm font-medium text-secondary hover:underline cursor-pointer">{order.shipTo}</p>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order # {order.id}</p>
                <div className="flex items-center gap-3 mt-1">
                  <button className="text-sm font-medium text-secondary hover:underline transition-all">
                    View order details
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-sm font-medium text-secondary hover:underline transition-all">
                    Invoice
                  </button>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">{order.deliveryMessage}</h3>
              <div className="flex flex-col gap-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-1 gap-6">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2">
                        <Image src={item.image} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1">
                        <Link href="#" className="font-semibold text-gray-900 hover:text-secondary hover:underline line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">{item.returnEligible}</p>
                        
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                            <RefreshCw size={16} />
                            Buy it again
                          </button>
                          <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                            View your item
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full md:w-48 shrink-0">
                      <button className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                        Track package
                      </button>
                      <button className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                        Return or replace items
                      </button>
                      <button className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                        Share gift receipt
                      </button>
                      <button className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                        Write a product review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
