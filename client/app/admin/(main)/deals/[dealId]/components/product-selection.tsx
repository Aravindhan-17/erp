import React from 'react';
import { Image as ImageIcon, X, Plus } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface ProductSelectionProps {
  products: Product[];
  selectedProducts: Product[];
  toggleProduct: (product: Product) => void;
}

export function ProductSelection({ products, selectedProducts, toggleProduct }: ProductSelectionProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          Product selection
        </h2>
        <p className="text-sm text-gray-500">
          Pick products from the catalog to include in this deal.
        </p>
      </div>

      {/* Selected products */}
      <div>
        <p className="mb-1.5 text-[14px] font-bold text-gray-700">
          Selected products ({selectedProducts.length})
        </p>

        <div className="space-y-1.5">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-1.5"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                  <ImageIcon size={14} className="text-gray-400" />
                </div>
                <span className="truncate text-xs font-semibold text-gray-700">
                  {product.name}
                </span>
              </div>

              <div className="ml-3 flex shrink-0 items-center gap-3">
                <span className="text-xs font-bold text-gray-700">
                  {product.price}
                </span>
                <button
                  type="button"
                  onClick={() => toggleProduct(product)}
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 text-red-500 transition hover:bg-red-100"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <div className="mt-4">
        <p className="mb-1.5 text-[14px] font-bold text-gray-700">
          Add from catalog
        </p>

        <div className="max-h-[220px] overflow-y-auto rounded-lg border border-gray-100">
          {products.map((product) => {
            const selected = selectedProducts.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="flex items-center justify-between border-b border-gray-100 px-2 py-1.5 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                    <ImageIcon size={14} className="text-gray-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-gray-700">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {product.price} • Electronics
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={selected}
                  onClick={() => toggleProduct(product)}
                  className={`flex h-8 min-w-[48px] items-center justify-center gap-1 rounded-full border px-3 text-[10px] font-bold transition ${
                    selected
                      ? "border-gray-100 bg-gray-50 text-gray-300"
                      : "border-violet-100 bg-violet-50 text-violet-600 hover:bg-violet-100"
                  }`}
                >
                  {selected ? (
                    "Added"
                  ) : (
                    <>
                      <Plus size={12} /> Add
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
