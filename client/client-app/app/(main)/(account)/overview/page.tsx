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
      <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, John! Here&apos;s a quick summary of your account.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Quick Stats */}
        <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-blue-50 p-3 text-blue-600">
            <Package size={24} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Active Orders
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">2</p>
          <Link href="/orders" className="text-secondary mt-4 text-sm font-medium hover:underline">
            View Orders &rarr;
          </Link>
        </div>

        <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-green-50 p-3 text-green-600">
            <Wallet size={24} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Store Credit
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">$120.50</p>
          <Link href="/wallet" className="text-secondary mt-4 text-sm font-medium hover:underline">
            Manage Wallet &rarr;
          </Link>
        </div>

        <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-purple-50 p-3 text-purple-600">
            <MapPin size={24} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Saved Addresses
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">1</p>
          <Link
            href="/addresses"
            className="text-secondary mt-4 text-sm font-medium hover:underline"
          >
            Manage Addresses &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Orders Snapshot */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/orders"
            className="text-secondary flex items-center text-sm font-medium hover:underline"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:border-gray-300 sm:flex-row">
            <div className="flex w-full items-center gap-4 sm:w-auto">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-1">
                <Image
                  src={Product1}
                  alt="Product"
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">ORD-7392-4821</p>
                <p className="text-sm text-gray-500">Placed on Aug 10, 2026</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Delivered
              </span>
              <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Track
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
