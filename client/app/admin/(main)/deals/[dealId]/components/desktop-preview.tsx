import React from 'react';
import { Clock3, Image as ImageIcon } from "lucide-react";
import { PreviewInfo } from "./preview-info";

export function DesktopPreview({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: {
    id: number;
    name: string;
    price: string;
  }[];
}) {
  return (
    <div
      className="
        w-full
        max-w-[620px]
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-[0_15px_50px_rgba(30,20,80,0.15)]
      "
    >
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400">
              FLASH DEAL
            </p>

            <h2 className="mt-1 text-lg font-extrabold text-gray-900">
              {title || "Untitled deal"}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {subtitle || "Limited time offer"}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-bold text-yellow-700">
            <Clock3 size={11} />
            STARTING SOON
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="m-5 flex h-[190px] items-center justify-center rounded-xl bg-gradient-to-br from-[#1794ad] via-[#1d668c] to-[#2d386f]">
        <div className="text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">
            Home appliances
          </p>

          <p className="mt-2 text-5xl font-extrabold">
            H
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="grid grid-cols-3 gap-3 px-5">
        {[
          ["01", "DAY"],
          ["14", "HR"],
          ["32", "MIN"],
        ].map(([number, label]) => (
          <div
            key={label}
            className="
              rounded-xl
              bg-gray-950
              px-3
              py-3
              text-center
              text-white
            "
          >
            <p className="text-xl font-extrabold text-yellow-400">
              {number}
            </p>

            <p className="text-[9px] text-gray-400">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="px-5 py-5">
        <div className="grid grid-cols-4 gap-4 border-b border-gray-100 pb-5">
          <PreviewInfo label="REG. FEE" value="₹1" />
          <PreviewInfo label="MIN. ORDER" value="₹5,000" />
          <PreviewInfo label="RESERVATION" value="10 min" />
          <PreviewInfo label="MAX / ITEM" value="3" />
        </div>

        {/* Products */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-bold text-gray-800">
            PRODUCTS ({products.length})
          </p>

          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 p-3"
              >
                <div className="flex h-24 items-center justify-center rounded-lg bg-gray-100">
                  <ImageIcon
                    size={28}
                    className="text-gray-400"
                  />
                </div>

                <p className="mt-2 line-clamp-2 text-xs font-bold text-gray-700">
                  {product.name}
                </p>

                <p className="mt-1 text-sm font-extrabold text-violet-600">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="
            mt-5
            w-full
            rounded-xl
            bg-gradient-to-r
            from-[#6631e8]
            to-[#5120d3]
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
          "
        >
          Register for ₹1
        </button>
      </div>
    </div>
  );
}
