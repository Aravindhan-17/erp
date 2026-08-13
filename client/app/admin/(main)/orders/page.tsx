import { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2C Orders & Invoices — FlashERP Admin",
};

export default function OrdersPage() {
  return (
    <div className="space-y-8 font-poppins">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">B2C Orders & Invoices</h1>
          <p className="text-gray-500 text-sm mt-1">Track customer orders, manage shipments, and generate invoices.</p>
        </div>
      </div>
      
      <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white">
        <p className="text-sm font-medium text-gray-500">Orders Management Content</p>
      </div>
    </div>
  );
}
