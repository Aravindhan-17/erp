"use client";

import { Grid2X2, List } from "lucide-react";

interface CategoryToolbarProps {
  title: string;
  totalProducts: number;
}

export function CategoryToolbar({ title, totalProducts }: CategoryToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>

        <p className="mt-1 text-sm text-gray-500">{totalProducts} Products</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by</span>

          <select className="rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none">
            <option>Featured</option>
            <option>Newest</option>
            <option>Price Low</option>
            <option>Price High</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">View</span>

          <div className="flex overflow-hidden rounded-xl border border-gray-200">
            <button className="bg-secondary p-3 text-white">
              <Grid2X2 size={18} />
            </button>

            <button className="border-l border-gray-200 bg-white p-3 hover:bg-gray-100">
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
