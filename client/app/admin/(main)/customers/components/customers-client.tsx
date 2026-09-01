"use client";

import { useState } from "react";
import { Eye, Search, ChevronDown, Download, MapPin } from "lucide-react";
import { Modal } from "@/components/modal";

const customers = [
  {
    id: 1,
    name: "Aarav Ramesh",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    segment: "Active",
    registrations: 1,
    orders: 1,
    spend: "₹5,999",
    activity: "04 Aug, 12:12",
    status: "Active",
    location: "Bangalore, Karnataka",
    recentOrders: [
      {
        deal: "Office Essentials Clearance",
        id: "FD-88192",
        date: "02 Aug",
        amount: "₹5,999",
        status: "Delivered",
      },
    ],
    lifetimeSpend: "₹5,999",
    dealsJoined: 1,
    avgOrderValue: "₹5,999",
  },
  {
    id: 2,
    name: "Meera Iyer",
    email: "meera@example.com",
    phone: "+91 98401 11220",
    segment: "VIP",
    registrations: 1,
    orders: 1,
    spend: "₹52,999",
    activity: "04 Aug, 11:58",
    status: "Active",
    location: "Mumbai, Maharashtra",
    recentOrders: [
      {
        deal: "Monsoon Electronics Sale",
        id: "FD-88231",
        date: "20 Jul",
        amount: "₹52,999",
        status: "Confirmed",
      },
    ],
    lifetimeSpend: "₹52,999",
    dealsJoined: 1,
    avgOrderValue: "₹52,999",
  },
  {
    id: 3,
    name: "Rohan Das",
    email: "rohan@example.com",
    phone: "+91 99030 88441",
    segment: "VIP",
    registrations: 1,
    orders: 1,
    spend: "₹10,998",
    activity: "04 Aug, 11:44",
    status: "Active",
    location: "New Delhi",
    recentOrders: [
      {
        deal: "Monsoon Electronics Sale",
        id: "FD-88230",
        date: "20 Jul",
        amount: "₹10,998",
        status: "Shipped",
      },
    ],
    lifetimeSpend: "₹10,998",
    dealsJoined: 1,
    avgOrderValue: "₹10,998",
  },
  {
    id: 4,
    name: "Priya Nair",
    email: "priya@example.com",
    phone: "+91 98470 33121",
    segment: "Active",
    registrations: 1,
    orders: 1,
    spend: "₹5,999",
    activity: "04 Aug, 10:32",
    status: "Active",
    location: "Pune, Maharashtra",
    recentOrders: [
      {
        deal: "Office Essentials Clearance",
        id: "FD-88229",
        date: "19 Jul",
        amount: "₹5,999",
        status: "Delivered",
      },
    ],
    lifetimeSpend: "₹5,999",
    dealsJoined: 1,
    avgOrderValue: "₹5,999",
  },
  {
    id: 5,
    name: "Kabir Sen",
    email: "kabir@example.com",
    phone: "+91 98300 11882",
    segment: "Active",
    registrations: 1,
    orders: 1,
    spend: "₹0",
    activity: "04 Aug, 09:48",
    status: "Review",
    location: "Kolkata, West Bengal",
    recentOrders: [
      {
        deal: "Monsoon Electronics Sale",
        id: "FD-88228",
        date: "20 Jul",
        amount: "₹41,999",
        status: "Payment Pending",
      },
    ],
    lifetimeSpend: "₹0",
    dealsJoined: 1,
    avgOrderValue: "₹0",
  },
  {
    id: 6,
    name: "Ananya Rao",
    email: "ananya@example.com",
    phone: "+91 98860 44210",
    segment: "New",
    registrations: 1,
    orders: 1,
    spend: "₹3,398",
    activity: "03 Aug, 19:04",
    status: "Active",
    location: "Hyderabad, Telangana",
    recentOrders: [
      {
        deal: "Office Essentials Clearance",
        id: "FD-88227",
        date: "19 Jul",
        amount: "₹3,398",
        status: "Cancelled",
      },
    ],
    lifetimeSpend: "₹3,398",
    dealsJoined: 1,
    avgOrderValue: "₹3,398",
  },
];

export function CustomersClient() {
  const [viewingCustomer, setViewingCustomer] = useState<(typeof customers)[0] | null>(null);

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="font-poppins min-w-0 overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Customers
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Customer profiles, participation, spend and risk signals.
          </p>
        </div>
        <button
          type="button"
          className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:border-gray-300 hover:shadow"
        >
          <span>Export CSV</span>
          <Download size={16} />
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="sm:max-w-82.5 flex h-12 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
          <Search size={18} className="shrink-0 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, email or phone..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Segment */}
        <div className="sm:w-41.25 relative w-full">
          <select
            defaultValue="all"
            className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm font-medium text-gray-700 shadow-sm outline-none transition hover:border-gray-300 focus:border-[#6734ed] focus:ring-2 focus:ring-[#6734ed]/10"
          >
            <option value="all">All segments</option>
            <option value="active">Active</option>
            <option value="vip">VIP</option>
            <option value="new">New</option>
          </select>
          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="mt-5 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(30,20,80,0.04)]">
        <div className="hide-scrollbar w-full overflow-x-auto">
          <table className="min-w-275 w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="w-60 px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Customer
                </th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Segment
                </th>
                <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Registrations
                </th>
                <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Orders
                </th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Total Spend
                </th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Last Activity
                </th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </th>
                <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-primary/5 border-b border-gray-100 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="min-w-52.5">
                      <p className="text-sm font-semibold text-gray-800">{customer.name}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{customer.email}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                        customer.segment === "VIP"
                          ? "bg-amber-50 text-amber-600"
                          : customer.segment === "New"
                            ? "bg-primary/10 text-primary"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {customer.segment}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm font-medium text-gray-700">
                      {customer.registrations}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm font-medium text-gray-700">{customer.orders}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                      {customer.spend}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-xs font-medium text-gray-400">
                      {customer.activity}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                        customer.status === "Review"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        title="View customer"
                        onClick={() => setViewingCustomer(customer)}
                        className="hover:border-primary/30 hover:bg-primary/10 hover:text-primary flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-700 shadow-sm transition-all"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER PROFILE MODAL */}
      <Modal
        isOpen={!!viewingCustomer}
        onClose={() => setViewingCustomer(null)}
        title="Customer profile"
        maxWidth="2xl"
      >
        {viewingCustomer && (
          <div className="mt-4 space-y-8">
            {/* Header info */}
            <div className="flex items-start gap-5">
              <div className="bg-linear-to-br flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl from-violet-500 to-fuchsia-500 text-xl font-bold text-white shadow-md">
                {getInitials(viewingCustomer.name)}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-gray-900">{viewingCustomer.name}</h2>
                <div className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                  <p className="text-sm font-medium text-gray-500">{viewingCustomer.email}</p>
                  <p className="hidden text-gray-300 sm:block">•</p>
                  <p className="text-sm font-medium text-gray-500">{viewingCustomer.phone}</p>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-gray-500">
                  <MapPin size={14} />
                  <p className="text-sm font-medium">{viewingCustomer.location}</p>
                </div>
              </div>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Lifetime Spend
                </p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  {viewingCustomer.lifetimeSpend}
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Flash Deals Joined
                </p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  {viewingCustomer.dealsJoined}
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Orders
                </p>
                <p className="mt-2 text-xl font-bold text-gray-900">{viewingCustomer.orders}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Avg. Order Value
                </p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  {viewingCustomer.avgOrderValue}
                </p>
              </div>
            </div>

            {/* Recent Orders List */}
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Recent Orders
              </p>

              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500">
                        <th className="px-4 py-3 font-medium">Deal</th>
                        <th className="px-4 py-3 font-medium">Order ID</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Amount</th>
                        <th className="px-4 py-3 text-right font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(
                        viewingCustomer.recentOrders as {
                          deal: string;
                          id: string;
                          date: string;
                          amount: string;
                          status: string;
                        }[]
                      )?.map((order, idx: number) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                            {order.deal}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-600">{order.id}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                            {order.date}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                            {order.amount}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span
                              className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold ${
                                order.status === "Delivered"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : order.status === "Cancelled"
                                    ? "bg-red-50 text-red-500"
                                    : "bg-primary/10 text-primary"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {(!viewingCustomer.recentOrders || viewingCustomer.recentOrders.length === 0) && (
                    <div className="py-6 text-center text-sm text-gray-500">
                      No recent orders found.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setViewingCustomer(null)}
                className="bg-primary w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-white shadow-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
