"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { Modal } from '@/components/modal';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

const products = [
  {
    id: 1,
    name: 'UltraSound 65" 4K Smart TV',
    sku: "ELEC-TV-065",
    category: "Electronics",
    mrp: "₹89,999",
    flashPrice: "₹52,999",
    openingStock: 40,
    available: 10,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    name: "AirPure Noise-Cancel Headphones",
    sku: "ELEC-HP-021",
    category: "Electronics",
    mrp: "₹12,999",
    flashPrice: "₹5,499",
    openingStock: 120,
    available: 20,
    status: "Low stock",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    name: 'FlexBook 14" Ultraslim Laptop',
    sku: "ELEC-LP-014",
    category: "Electronics",
    mrp: "₹64,999",
    flashPrice: "₹41,999",
    openingStock: 25,
    available: 1,
    status: "Low stock",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 4,
    name: "ChillMax 260L Frost-Free Fridge",
    sku: "APP-FR-260",
    category: "Home Appliances",
    mrp: "₹34,999",
    flashPrice: "₹22,499",
    openingStock: 18,
    available: 7,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 5,
    name: "SpinPro 8kg Front-Load Washer",
    sku: "APP-WM-008",
    category: "Home Appliances",
    mrp: "₹28,999",
    flashPrice: "₹18,999",
    openingStock: 16,
    available: 1,
    status: "Low stock",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 6,
    name: "Linen Weekend Shirt (Pack of 2)",
    sku: "FSH-SH-102",
    category: "Fashion",
    mrp: "₹2,499",
    flashPrice: "₹999",
    openingStock: 200,
    available: 42,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 7,
    name: "StrideFit Running Sneakers",
    sku: "FSH-SN-045",
    category: "Fashion",
    mrp: "₹4,999",
    flashPrice: "₹2,199",
    openingStock: 90,
    available: 20,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 8,
    name: "Nordic Oak 3-Seater Sofa",
    sku: "FUR-SF-301",
    category: "Furniture",
    mrp: "₹54,999",
    flashPrice: "₹36,999",
    openingStock: 10,
    available: 5,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=120&q=80",
  },
];

export function ProductsClient() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  return (
    <div className="font-poppins min-w-0 overflow-x-hidden">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Master catalog available for flash deal selection.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddProductModalOpen(true)}
          className="
            bg-primary
            hover:bg-primary-hover
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
          Add new product
        </button>
      </div>

      {/* PRODUCT TABLE CARD */}
      <DataTable 
        columns={columns} 
        data={products} 
        searchKey="name"
        filters={[
          {
            columnId: "category",
            label: "All Categories",
            options: [
              { label: "Electronics", value: "Electronics" },
              { label: "Fashion & Apparel", value: "Fashion & Apparel" },
              { label: "Home Appliances", value: "Home Appliances" },
              { label: "Mobile Accessories", value: "Mobile Accessories" },
            ]
          },
          {
            columnId: "status",
            label: "All Statuses",
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]
          }
        ]}
        bulkActions={
          <>
            <button className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-sm hover:bg-gray-50 transition">
              Mark as Active
            </button>
            <button className="h-9 px-3 rounded-lg border border-red-100 bg-red-50 text-red-600 text-xs font-medium shadow-sm hover:bg-red-100 transition">
              Delete Selected
            </button>
          </>
        }
      />

      {/* ADD PRODUCT MODAL */}
      <Modal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        title="Add new product"
        maxWidth="3xl"
      >
        <form
          className="mt-2 space-y-6 "
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddProductModalOpen(false);
          }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
                placeholder='e.g. UltraSound 65" 4K Smart TV'
              />
            </div>

            {/* SKU */}
            <div>
              <label htmlFor="sku" className="mb-2 block text-sm font-semibold text-gray-700">
                SKU
              </label>
              <input
                type="text"
                id="sku"
                className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
                placeholder="e.g. ELEC-TV-065"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="focus:border-primary focus:ring-primary/10 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
              >
                <option value="" disabled selected>
                  Select category...
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Furniture">Furniture</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label htmlFor="image" className="mb-2 block text-sm font-semibold text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
                placeholder="https://..."
              />
            </div>

            {/* MRP */}
            <div>
              <label htmlFor="mrp" className="mb-2 block text-sm font-semibold text-gray-700">
                MRP (₹)
              </label>
              <input
                type="number"
                id="mrp"
                className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
                placeholder="0.00"
              />
            </div>

            {/* Flash Price */}
            <div>
              <label
                htmlFor="flashPrice"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Flash Price (₹)
              </label>
              <input
                type="number"
                id="flashPrice"
                className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
                placeholder="0.00"
              />
            </div>

            {/* Opening Stock */}
            <div>
              <label
                htmlFor="openingStock"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Opening Stock
              </label>
              <input
                type="number"
                id="openingStock"
                className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
                placeholder="0"
              />
            </div>

            {/* Low-stock alert at */}
            <div>
              <label
                htmlFor="lowStockAlert"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Low-stock alert at
              </label>
              <input
                type="number"
                id="lowStockAlert"
                className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
                placeholder="0"
              />
            </div>

            {/* Max quantity per customer */}
            <div className="sm:col-span-2">
              <label htmlFor="maxQty" className="mb-2 block text-sm font-semibold text-gray-700">
                Max quantity per customer
              </label>
              <input
                type="number"
                id="maxQty"
                className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-4"
                placeholder="Leave blank for no limit"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAddProductModalOpen(false)}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition"
            >
              Save product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
