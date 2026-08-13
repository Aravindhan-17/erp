"use client";

import React from "react";
import Image from "next/image";
import { Product1, Product2, Product3 } from "@/assets/images";
import { Search, Filter, ChevronRight, Package, ArrowUpRight } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-7392-4821",
      date: "Aug 10, 2026",
      status: "Delivered",
      total: "$245.00",
      items: [
        { name: "Wireless Noise-Canceling Headphones", image: Product1, qty: 1, price: "$199.00" },
        { name: "Premium Leather Watch Band", image: Product2, qty: 1, price: "$46.00" },
      ],
    },
    {
      id: "ORD-2941-8573",
      date: "Aug 02, 2026",
      status: "Shipped",
      total: "$89.99",
      items: [
        { name: "Smart Home Security Camera", image: Product3, qty: 1, price: "$89.99" },
      ],
    },
    {
      id: "ORD-5832-1948",
      date: "Jul 15, 2026",
      status: "Delivered",
      total: "$12.50",
      items: [
        { name: "USB-C Fast Charging Cable", image: Product1, qty: 1, price: "$12.50" },
      ],
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Track, return, or buy items again.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..."
              className="w-full sm:w-64 rounded-xl border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-100 bg-gray-50 p-6">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Placed</p>
                  <p className="font-semibold text-gray-900 mt-1">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</p>
                  <p className="font-semibold text-gray-900 mt-1">{order.total}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</p>
                  <p className="font-semibold text-gray-900 mt-1">{order.id}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                  {order.status}
                </span>
                <button className="text-sm font-medium text-secondary hover:underline transition-all">
                  View Invoice
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="flex flex-col gap-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 p-2">
                        <Image src={item.image} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">Qty: {item.qty} &bull; {item.price}</p>
                        
                        <div className="mt-3 flex items-center gap-4">
                          <button className="text-sm font-medium text-secondary hover:underline transition-colors">
                            Buy it again
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            Track package
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Footer */}
            <div className="bg-white p-4 border-t border-gray-100">
              <button className="flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary transition-colors">
                View Order Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
