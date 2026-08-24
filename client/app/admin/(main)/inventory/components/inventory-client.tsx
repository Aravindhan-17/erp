"use client";

import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import { Modal } from "@/components/modal";

const inventoryItems = [
  {
    id: 1,
    product: 'UltraSound 65" 4K Smart TV',
    sku: "ELEC-TV-065",
    onHand: 14,
    reserved: 4,
    available: 10,
    alertAt: 8,
    status: "Partially reserved",
  },
  {
    id: 2,
    product: "AirPure Noise-Cancel Headphones",
    sku: "ELEC-HP-021",
    onHand: 32,
    reserved: 12,
    available: 20,
    alertAt: 20,
    status: "Low stock",
  },
  {
    id: 3,
    product: 'FlexBook 14" Ultraslim Laptop',
    sku: "ELEC-LP-014",
    onHand: 4,
    reserved: 3,
    available: 1,
    alertAt: 5,
    status: "Low stock",
  },
  {
    id: 4,
    product: "ChillMax 260L Frost-Free Fridge",
    sku: "APP-FR-260",
    onHand: 9,
    reserved: 2,
    available: 7,
    alertAt: 5,
    status: "Partially reserved",
  },
  {
    id: 5,
    product: "SpinPro 8kg Front-Load Washer",
    sku: "APP-WM-008",
    onHand: 2,
    reserved: 1,
    available: 1,
    alertAt: 4,
    status: "Low stock",
  },
  {
    id: 6,
    product: "Linen Weekend Shirt (Pack of 2)",
    sku: "FSH-SH-102",
    onHand: 60,
    reserved: 18,
    available: 42,
    alertAt: 30,
    status: "Partially reserved",
  },
  {
    id: 7,
    product: "StrideFit Running Sneakers",
    sku: "FSH-SN-045",
    onHand: 29,
    reserved: 9,
    available: 20,
    alertAt: 15,
    status: "Partially reserved",
  },
  {
    id: 8,
    product: "Nordic Oak 3-Seater Sofa",
    sku: "FUR-SF-301",
    onHand: 6,
    reserved: 1,
    available: 5,
    alertAt: 3,
    status: "Partially reserved",
  },
  {
    id: 9,
    product: "Study Desk with Storage",
    sku: "FUR-DS-118",
    onHand: 23,
    reserved: 2,
    available: 21,
    alertAt: 8,
    status: "Partially reserved",
  },
  {
    id: 10,
    product: "GlowLab Vitamin C Serum Kit",
    sku: "BEA-SK-009",
    onHand: 53,
    reserved: 14,
    available: 39,
    alertAt: 25,
    status: "Partially reserved",
  },
];

export function InventoryClient() {
  const [adjustingStockProduct, setAdjustingStockProduct] = useState<typeof inventoryItems[0] | null>(null);

  return (
    <div className="min-w-0 overflow-x-hidden font-poppins">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Inventory management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            On-hand, reserved and available stock across all products.
          </p>
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full sm:w-45">
          <select
            defaultValue="Electronics"
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-600 shadow-sm outline-none transition-all hover:border-gray-300 focus:border-[#6734ed] focus:ring-2 focus:ring-[#6734ed]/10"
          >
            <option value="Electronics">Electronics</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Fashion">Fashion</option>
            <option value="Furniture">Furniture</option>
            <option value="Beauty">Beauty</option>
          </select>
          <ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mt-6 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(30,20,80,0.04)]">
        <div className="max-h-150 w-full overflow-x-auto overflow-y-auto hide-scrollbar">
          <table className="w-full min-w-300 border-collapse">

            {/* Column widths */}
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

            {/* ================= TABLE HEADER ================= */}
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Product</th>
                <th className="px-3 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">SKU</th>
                <th className="px-3 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">On Hand</th>
                <th className="px-3 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Reserved</th>
                <th className="px-3 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Available</th>
                <th className="px-3 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Alert At</th>
                <th className="px-3 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Status</th>
                <th className="px-3 py-4 text-left text-[12px] font-bold uppercase tracking-wide text-gray-400">Last Updated</th>
                <th className="px-3 py-4 text-center text-[12px] font-bold uppercase tracking-wide text-gray-400">Actions</th>
              </tr>
            </thead>

            {/* ================= TABLE BODY ================= */}
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 transition-colors hover:bg-primary/5">
                  <td className="px-4 py-3 sm:px-6">
                    <p className="text-sm font-semibold text-gray-800">{item.product}</p>
                  </td>
                  <td className="px-3 py-3">
                    <span className="whitespace-nowrap text-xs font-medium text-gray-600">{item.sku}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-medium text-gray-700">{item.onHand}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-medium text-gray-700">{item.reserved}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-sm font-medium ${item.available <= item.alertAt ? "text-red-500" : "text-gray-700"}`}>
                      {item.available}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-medium text-gray-700">{item.alertAt}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold ${item.status === "Low stock" ? "bg-red-50 text-red-500" : "bg-primary/10 text-primary"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="whitespace-nowrap text-xs font-medium text-gray-400">Just now</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setAdjustingStockProduct(item)}
                        title="Edit inventory"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-700 shadow-sm transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ADJUST STOCK MODAL */}
      <Modal
        isOpen={!!adjustingStockProduct}
        onClose={() => setAdjustingStockProduct(null)}
        title={`Adjust stock — ${adjustingStockProduct?.product}`}
        maxWidth="xl"
      >
        {adjustingStockProduct && (
          <form className="mt-2 space-y-6" onSubmit={(e) => { e.preventDefault(); setAdjustingStockProduct(null); }}>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* On-hand stock */}
              <div>
                <label htmlFor="onHandStock" className="mb-2 block text-sm font-semibold text-gray-700">On-hand stock</label>
                <input
                  type="number"
                  id="onHandStock"
                  defaultValue={adjustingStockProduct.onHand}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
              </div>

              {/* Low-stock alert at */}
              <div>
                <label htmlFor="alertAt" className="mb-2 block text-sm font-semibold text-gray-700">Low-stock alert at</label>
                <input
                  type="number"
                  id="alertAt"
                  defaultValue={adjustingStockProduct.alertAt}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setAdjustingStockProduct(null)}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#6734ed] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#5120d3]"
              >
                Save changes
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
}
