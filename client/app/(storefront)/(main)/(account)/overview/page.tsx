"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Wallet, MapPin, ChevronRight } from "lucide-react";
import { Product1 } from "@/assets/images";

export default function AccountOverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, John! Here's a quick summary of your account.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Quick Stats */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-blue-50 p-3 text-blue-600">
            <Package size={24} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Orders</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">2</p>
          <Link href="/orders" className="mt-4 text-sm font-medium text-secondary hover:underline">View Orders &rarr;</Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-green-50 p-3 text-green-600">
            <Wallet size={24} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Store Credit</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">$120.50</p>
          <Link href="/wallet" className="mt-4 text-sm font-medium text-secondary hover:underline">Manage Wallet &rarr;</Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-purple-50 p-3 text-purple-600">
            <MapPin size={24} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Saved Addresses</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">1</p>
          <Link href="/addresses" className="mt-4 text-sm font-medium text-secondary hover:underline">Manage Addresses &rarr;</Link>
        </div>
      </div>

      {/* Recent Orders Snapshot */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link href="/orders" className="text-sm font-medium text-secondary hover:underline flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="h-16 w-16 shrink-0 rounded-lg border border-gray-100 bg-gray-50 p-1 flex items-center justify-center">
                <Image src={Product1} alt="Product" className="h-full w-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">ORD-7392-4821</p>
                <p className="text-sm text-gray-500">Placed on Aug 10, 2026</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Delivered
              </span>
              <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Track
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
