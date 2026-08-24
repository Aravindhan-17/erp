import React from 'react';
import { Image as ImageIcon } from "lucide-react";
import { PreviewInfo } from "./preview-info";

export function MobilePreview({
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
        w-72.5
        overflow-hidden
        rounded-[30px]
        border-[7px]
        border-[#17171d]
        bg-white
        shadow-[0_20px_50px_rgba(0,0,0,0.25)]
      "
    >
      {/* Phone top */}
      <div className="flex h-6 items-center justify-center bg-[#17171d]">
        <div className="h-1.5 w-14 rounded-full bg-gray-700" />
      </div>

      {/* App */}
      <div className="bg-white">
        {/* Banner */}
        <div className="p-4">
          <div className="mb-3 inline-flex rounded-full bg-yellow-400 px-3 py-1 text-[8px] font-extrabold text-gray-900">
            ● STARTING SOON
          </div>

          <div className="flex h-26.25 items-center justify-between overflow-hidden rounded-xl bg-linear-to-br from-[#1596af] via-[#20688c] to-[#283b73] px-4 text-white">
            <div>
              <p className="text-[9px] font-extrabold uppercase leading-tight">
                HOME
                <br />
                APPLIANCES
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-2xl font-extrabold">
              H
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="px-4">
          <h2 className="text-lg font-extrabold text-gray-900">
            {title || "Untitled deal"}
          </h2>

          <p className="mt-1 text-[10px] text-gray-500">
            {subtitle || "Limited time offer"}
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-4 grid grid-cols-3 gap-2 bg-gray-950 px-4 py-3">
          {[
            ["01", "DAY"],
            ["14", "HR"],
            ["32", "MIN"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="text-center"
            >
              <p className="text-lg font-extrabold text-yellow-400">
                {number}
              </p>

              <p className="text-[7px] text-gray-400">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Deal details */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <PreviewInfo
              label="REG. FEE"
              value="₹1"
            />

            <PreviewInfo
              label="MIN. ORDER"
              value="₹5,000"
            />

            <PreviewInfo
              label="RESERVATION"
              value="10 min"
            />

            <PreviewInfo
              label="MAX / ITEM"
              value="3"
            />
          </div>

          {/* Products */}
          <div className="mt-5">
            <p className="mb-3 text-xs font-bold text-gray-700">
              PRODUCTS ({products.length})
            </p>

            <div className="grid grid-cols-2 gap-2">
              {products.slice(0, 2).map((product) => (
                <div
                  key={product.id}
                  className="
                    rounded-lg
                    border
                    border-gray-200
                    p-2
                  "
                >
                  <div className="flex h-20 items-center justify-center rounded-md bg-gray-100">
                    <ImageIcon
                      size={23}
                      className="text-gray-400"
                    />
                  </div>

                  <p className="mt-2 line-clamp-2 text-[9px] font-bold leading-tight text-gray-700">
                    {product.name}
                  </p>

                  <p className="mt-1 text-[10px] font-extrabold text-primary">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Register */}
          <button
            type="button"
            className="
              mt-4
              w-full
              rounded-full
              bg-primary hover:bg-primary-hover
              py-2.5
              text-xs
              font-extrabold
              text-white
            "
          >
            Register for ₹1
          </button>
        </div>
      </div>
    </div>
  );
}
