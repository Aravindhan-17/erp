"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, ChevronDown, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/modal";

const tabs = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const orders = [
  {
    id: "FD-88192",
    customer: "Aarav Ramesh",
    deal: "Office Essentials Clearance",
    products: "ErgoFlex Mesh Office Chair",
    value: "₹5,999",
    payment: "Paid",
    status: "Delivered",
    date: "02 Aug, 16:20",
    address: "42 Residency Road, Shanthala Nagar, Bangalore, Karnataka 560025",
    productImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=120&q=80",
    timeline: [
      { step: "Order Placed", date: "02 Aug, 16:20", completed: true },
      { step: "Payment confirmed", date: "02 Aug, 16:22", completed: true },
      { step: "Shipped", date: "03 Aug, 10:15", completed: true },
      { step: "Delivered", date: "05 Aug, 14:30", completed: true },
    ]
  },
  {
    id: "FD-88231",
    customer: "Meera Iyer",
    deal: "Monsoon Electronics Sale",
    products: "UltraSound TV",
    value: "₹52,999",
    payment: "Paid",
    status: "Confirmed",
    date: "20 Jul, 11:42",
    address: "15 Marine Drive, Mumbai, Maharashtra 400020",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&q=80",
    timeline: [
      { step: "Order Placed", date: "20 Jul, 11:42", completed: true },
      { step: "Payment confirmed", date: "20 Jul, 11:45", completed: true },
      { step: "Shipped", date: "", completed: false },
      { step: "Delivered", date: "", completed: false },
    ]
  },
  {
    id: "FD-88230",
    customer: "Rohan Das",
    deal: "Monsoon Electronics Sale",
    products: "AirPure Headphones ×2",
    value: "₹10,998",
    payment: "Paid",
    status: "Shipped",
    date: "20 Jul, 11:20",
    address: "A-201, Green Park Extension, New Delhi 110016",
    productImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=120&q=80",
    timeline: [
      { step: "Order Placed", date: "20 Jul, 11:20", completed: true },
      { step: "Payment confirmed", date: "20 Jul, 11:22", completed: true },
      { step: "Shipped", date: "21 Jul, 09:00", completed: true },
      { step: "Delivered", date: "", completed: false },
    ]
  },
  {
    id: "FD-88229",
    customer: "Priya Nair",
    deal: "Office Essentials Clearance",
    products: "ErgoFlex Chair",
    value: "₹5,999",
    payment: "Paid",
    status: "Delivered",
    date: "19 Jul, 18:05",
    address: "78, Koregaon Park, Pune, Maharashtra 411001",
    productImage: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=120&q=80",
    timeline: [
      { step: "Order Placed", date: "19 Jul, 18:05", completed: true },
      { step: "Payment confirmed", date: "19 Jul, 18:07", completed: true },
      { step: "Shipped", date: "20 Jul, 14:00", completed: true },
      { step: "Delivered", date: "22 Jul, 11:30", completed: true },
    ]
  },
  {
    id: "FD-88228",
    customer: "Kabir Sen",
    deal: "Monsoon Electronics Sale",
    products: "FlexBook Laptop",
    value: "₹41,999",
    payment: "Pending",
    status: "Payment Pending",
    date: "20 Jul, 12:01",
    address: "10, Ballygunge Circular Road, Kolkata, West Bengal 700019",
    productImage: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=120&q=80",
    timeline: [
      { step: "Order Placed", date: "20 Jul, 12:01", completed: true },
      { step: "Payment confirmed", date: "", completed: false },
      { step: "Shipped", date: "", completed: false },
      { step: "Delivered", date: "", completed: false },
    ]
  },
  {
    id: "FD-88227",
    customer: "Ananya Rao",
    deal: "Office Essentials Clearance",
    products: "Badminton Set ×2",
    value: "₹3,398",
    payment: "Paid",
    status: "Cancelled",
    date: "19 Jul, 15:33",
    address: "Plot 45, Jubilee Hills, Hyderabad, Telangana 500033",
    productImage: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=120&q=80",
    timeline: [
      { step: "Order Placed", date: "19 Jul, 15:33", completed: true },
      { step: "Payment confirmed", date: "19 Jul, 15:35", completed: true },
      { step: "Cancelled", date: "19 Jul, 16:00", completed: true },
    ]
  },
  {
    id: "FD-88226",
    customer: "Vikram Shah",
    deal: "Monsoon Electronics Sale",
    products: "AirPure Headphones",
    value: "₹5,499",
    payment: "Refunded",
    status: "Refunded",
    date: "19 Jul, 09:14",
    address: "22, SG Highway, Ahmedabad, Gujarat 380015",
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80",
    timeline: [
      { step: "Order Placed", date: "19 Jul, 09:14", completed: true },
      { step: "Payment confirmed", date: "19 Jul, 09:16", completed: true },
      { step: "Refunded", date: "20 Jul, 10:00", completed: true },
    ]
  },
  {
    id: "FD-88225",
    customer: "Divya Menon",
    deal: "Office Essentials Clearance",
    products: "ErgoFlex Chair, Racket Set",
    value: "₹7,698",
    payment: "Paid",
    status: "Processing",
    date: "19 Jul, 08:52",
    address: "5th Main, Anna Nagar, Chennai, Tamil Nadu 600040",
    productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=120&q=80",
    timeline: [
      { step: "Order Placed", date: "19 Jul, 08:52", completed: true },
      { step: "Payment confirmed", date: "19 Jul, 08:55", completed: true },
      { step: "Processing", date: "19 Jul, 10:00", completed: true },
      { step: "Shipped", date: "", completed: false },
      { step: "Delivered", date: "", completed: false },
    ]
  },
];

export function OrdersClient() {
  const [viewingOrder, setViewingOrder] = useState<typeof orders[0] | null>(null);

  return (
    <div className="min-w-0 overflow-x-hidden font-poppins">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Orders
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          All flash deal orders across the platform.
        </p>
      </div>

      {/* TABS */}
      <div className="mt-7 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
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

      <div className="mt-6 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(30,20,80,0.04)]">
        <div className="max-h-150 w-full overflow-x-auto overflow-y-auto hide-scrollbar">
          <table className="w-full min-w-300 border-collapse">
            <colgroup>
              <col className="w-76.25" />
              <col className="w-33.75" />
              <col className="w-26.25" />
              <col className="w-27.5" />
              <col className="w-27.5" />
              <col className="w-27.5" />
              <col className="w-47.5" />
              <col className="w-33.75" />
              <col className="w-25" />
            </colgroup>

            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-gray-100">
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Order ID</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Customer</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Deal</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Products</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Value</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Payment</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Status</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Date</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 transition-colors hover:bg-violet-50/60">
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-sm font-bold text-gray-800">{order.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-sm font-medium text-gray-700">{order.customer}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-sm font-medium text-gray-700">{order.deal}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-xs font-medium text-gray-400">{order.products}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-sm font-semibold text-gray-800">{order.value}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-sm font-medium text-gray-700">{order.payment}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                      order.status === "Delivered" ? "bg-emerald-50 text-emerald-600" :
                      order.status === "Confirmed" || order.status === "Shipped" || order.status === "Processing" ? "bg-violet-50 text-violet-600" :
                      order.status === "Payment Pending" ? "bg-amber-50 text-amber-600" :
                      "bg-red-50 text-red-500"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-xs font-medium text-gray-400">{order.date}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setViewingOrder(order)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-600 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                      >
                        <Eye size={15}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      <Modal
        isOpen={!!viewingOrder}
        onClose={() => setViewingOrder(null)}
        title=""
        maxWidth="2xl"
      >
        {viewingOrder && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">{viewingOrder.id}</h2>
                <span className="text-sm font-medium text-gray-500">• {viewingOrder.customer}</span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Deal</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingOrder.deal}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Order Value</p>
                <p className="mt-1 text-sm font-bold text-violet-600">{viewingOrder.value}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Payment</p>
                <p className="mt-1 text-sm font-medium text-gray-900">Credit Card / {viewingOrder.payment}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Order Date</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingOrder.date}</p>
              </div>
              
              <div className="col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Delivery Address</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{viewingOrder.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Items Section */}
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Items (1)</p>
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 shadow-sm">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image src={viewingOrder.productImage as string} alt={viewingOrder.products as string} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{viewingOrder.products}</p>
                    <p className="mt-1 text-xs font-medium text-gray-500">Qty: 1</p>
                    <p className="mt-1 text-sm font-bold text-gray-900">{viewingOrder.value}</p>
                  </div>
                </div>
              </div>

              {/* Fulfillment Timeline */}
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Fulfillment Status</p>
                <div className="relative pl-4 space-y-5">
                  <div className="absolute left-1.75 top-2 bottom-2 w-0.5 bg-gray-100" />
                  
                  {(viewingOrder.timeline as { step: string; date: string; completed: boolean }[])?.map((step, idx: number) => (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${step.completed ? 'bg-emerald-500' : 'bg-gray-200 border-2 border-white'}`}>
                        {step.completed && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <div className="min-w-0 flex-1 -mt-1">
                        <p className="text-sm font-medium text-gray-900">{step.step}</p>
                        {step.date && <p className="text-xs text-gray-500 mt-0.5">{step.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Update Section */}
            <div className="rounded-xl border border-gray-100 p-4">
               <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">Update Status</p>
               <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <select
                      defaultValue={viewingOrder.status}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-600 shadow-sm outline-none transition-all hover:border-gray-300 focus:border-[#6734ed] focus:ring-2 focus:ring-[#6734ed]/10"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                  <button type="button" className="shrink-0 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-gray-800">
                    Update status
                  </button>
               </div>
            </div>

            {/* Footer Close Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
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
