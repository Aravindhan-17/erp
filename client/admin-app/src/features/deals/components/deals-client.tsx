"use client";

import { Link } from '@tanstack/react-router';

import { useState } from "react";
import { BarChart3, Copy, Eye, Pencil, Plus } from "lucide-react";
import { Modal } from '@/components/modal';

const deals = [
  {
    id: 1,
    title: "Monsoon Electronics Sale",
    description: "Up to 55% off TVs, laptops & audio",
    status: "LIVE NOW",
    window: "11 Aug → 11 Aug",
    fee: "₹1",
    products: "3",
    registered: "1,842",
    orders: "611",
    revenue: "₹21,48,000",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    title: "Fashion Weekend Flash",
    description: "Buy 2 or more, save up to 60%",
    status: "LIVE NOW",
    window: "11 Aug → 11 Aug",
    fee: "₹1",
    products: "2",
    registered: "963",
    orders: "0",
    revenue: "₹0",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    title: "Nordic Living Furniture Drop",
    description: "Statement furniture at flash prices",
    status: "UPCOMING",
    window: "12 Aug → 13 Aug",
    fee: "₹1",
    products: "2",
    registered: "402",
    orders: "0",
    revenue: "₹0",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 4,
    title: "Beauty Box Blitz",
    description: "Skincare & wellness, flash-priced",
    status: "UPCOMING",
    window: "14 Aug → 14 Aug",
    fee: "₹1",
    products: "2",
    registered: "118",
    orders: "0",
    revenue: "₹0",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 5,
    title: "Office Essentials Clearance",
    description: "Chairs, desks & workspace gear",
    status: "ENDED",
    window: "10 Aug → 11 Aug",
    fee: "₹1",
    products: "2",
    registered: "754",
    orders: "288",
    revenue: "₹13,82,000",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 6,
    title: "Sports Gear Rush",
    description: "Draft — pending final review",
    status: "DRAFT",
    window: "17 Aug → 17 Aug",
    fee: "₹1",
    products: "1",
    registered: "0",
    orders: "0",
    revenue: "₹0",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80",
  },
];

const tabs = ["All", "Live", "Upcoming", "Past", "Draft"];

const statusClass = (status: string) => {
  switch (status) {
    case "LIVE NOW":
      return "bg-emerald-50 text-emerald-600";
    case "UPCOMING":
      return "bg-primary/10 text-primary";
    case "ENDED":
      return "bg-gray-100 text-gray-500";
    case "DRAFT":
      return "bg-gray-100 text-gray-500";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

export function DealsClient() {
  const [viewingDeal, setViewingDeal] = useState<(typeof deals)[number] | null>(null);

  return (
    <div className="font-poppins min-w-0 overflow-x-hidden">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Flash deals
          </h1>
          <p className="mt-1 text-sm text-gray-500">Manage live, upcoming, past and draft deals.</p>
        </div>

        <Link
          to="/deals"
          className="
            bg-primary
            hover:bg-primary-hover
            shadow-primary/20
            shadow-primary/20
            inline-flex
            w-fit items-center
            gap-2
            rounded-xl
            px-5
            py-3
            text-sm
            font-semibold text-white
            shadow-md
            
            transition hover:shadow-md
          "
        >
          <Plus size={17} strokeWidth={2.5} />
          Create new deal
        </Link>
      </div>

      {/* TABS */}
      <div className="scrollbar-hide mt-7 flex items-center gap-1 overflow-x-auto pb-1">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`
              shrink-0
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-semibold
              transition
              ${
                index === 0
                  ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-100"
                  : "text-gray-500 hover:bg-white hover:text-gray-900"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="hide-scrollbar mt-5 w-full overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(30,20,80,0.04)]">
        <table className="min-w-312.5 w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/40">
              <th className="w-77.5 px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Deal
              </th>
              <th className="w-27.5 px-3 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Status
              </th>
              <th className="w-35 px-3 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Window
              </th>
              <th className="w-20 px-3 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Reg. Fee
              </th>
              <th className="w-20 px-3 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Products
              </th>
              <th className="w-27.5 px-3 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Registered
              </th>
              <th className="w-20 px-3 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Orders
              </th>
              <th className="w-30 px-3 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Revenue
              </th>
              <th className="w-45 px-3 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr
                key={deal.id}
                className="hover:bg-primary/5 group border-b border-gray-100 transition last:border-b-0"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        
                        
                        className="object-cover w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900">{deal.title}</p>
                      <p className="mt-1 truncate text-xs text-gray-500">{deal.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3.5">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold ${statusClass(deal.status)}`}
                  >
                    {deal.status}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="whitespace-nowrap text-xs font-medium text-gray-600">
                    {deal.window}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="text-xs font-semibold text-gray-700">{deal.fee}</span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="text-xs font-semibold text-gray-700">{deal.products}</span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="text-xs font-medium text-gray-700">{deal.registered}</span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="text-xs font-medium text-gray-700">{deal.orders}</span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="whitespace-nowrap text-xs font-semibold text-gray-800">
                    {deal.revenue}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      title="View"
                      onClick={() => setViewingDeal(deal)}
                      className="hover:border-primary/30 hover:bg-primary/10 hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-700 shadow-sm transition"
                    >
                      <Eye size={16} />
                    </button>
                    <Link
                      to="/deals/$dealId" params={{ dealId: String(deal.id) }}
                      title="Edit"
                      className="hover:border-primary/30 hover:bg-primary/10 hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-700 shadow-sm transition"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      type="button"
                      title="Duplicate"
                      className="hover:border-primary/30 hover:bg-primary/10 hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-700 shadow-sm transition"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      type="button"
                      title="Analytics"
                      className="hover:border-primary/30 hover:bg-primary/10 hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-700 shadow-sm transition"
                    >
                      <BarChart3 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FLASH DEAL VIEW MODAL */}
      <Modal
        isOpen={!!viewingDeal}
        onClose={() => setViewingDeal(null)}
        title="Create New Deal"
        maxWidth="2xl"
      >
        {viewingDeal && (
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">{viewingDeal.title}</h2>
                <span
                  className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold ${statusClass(viewingDeal.status)}`}
                >
                  {viewingDeal.status}
                </span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Subtitle
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingDeal.description}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Window
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingDeal.window}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Registration Fee
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingDeal.fee}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Min. Order
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">₹5,000 / 2 items</p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Max Qty / Customer
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">2 per product</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Registered
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingDeal.registered}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Orders
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingDeal.orders}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Revenue
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingDeal.revenue}</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Products (3)
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Dummy Product 1 */}
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-600">
                    <span className="text-center text-[10px] font-bold leading-tight text-white">
                      SMART
                      <br />
                      TV
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900">
                      UltraSound 65&quot; 4K Smart TV
                    </p>
                    <p className="text-primary mt-0.5 text-xs font-bold">₹52,999</p>
                  </div>
                </div>

                {/* Dummy Product 2 */}
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-800">
                    <span className="text-center text-[8px] font-bold leading-tight text-white">
                      HEAD-
                      <br />
                      PHONES
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900">
                      AirPure Noise-Cancel Headphones
                    </p>
                    <p className="text-primary mt-0.5 text-xs font-bold">₹5,499</p>
                  </div>
                </div>

                {/* Dummy Product 3 */}
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-teal-600">
                    <span className="text-[10px] font-bold text-white">LAPTOP</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900">
                      FlexBook 14&quot; Ultraslim Laptop
                    </p>
                    <p className="text-primary mt-0.5 text-xs font-bold">₹41,999</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setViewingDeal(null)}
                className="bg-primary w-full rounded-xl py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#5120d3]"
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
