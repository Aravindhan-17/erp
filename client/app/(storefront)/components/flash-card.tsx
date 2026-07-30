"use client";
import { useEffect, useState } from "react";
import { Package, IndianRupee, Bell } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export type FlashDealType = {
  id: number | string;
  status: string;
  badge: string;
  badgeText: string;
  image: string | StaticImageData;
  title: string;
  description: string;
  products: number;
  minOrder: string;
  button: string;
  buttonStyle: string;
  type: string;
};

export function Countdown() {
  const [time, setTime] = useState({
    h: 2,
    m: 34,
    s: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;

        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }

        return { h, m, s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Timer */}
      <div className="flex items-center gap-2 text-2xl font-semibold leading-none text-slate-900">
        <span>{String(time.h).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(time.m).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(time.s).padStart(2, "0")}</span>
      </div>

      {/* Labels */}
      <div className="mt-2 flex items-center gap-[33px] text-[11px] font-medium uppercase text-gray-500">
        <span>HRS</span>
        <span>MIN</span>
        <span>SEC</span>
      </div>
    </div>
  );
}

export function FlashCard({ deal }: { deal: FlashDealType }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 duration-300 hover:shadow-lg">
      <div className="relative">
        <Image
          src={deal.image}
          alt={deal.title}
          width={500}
          height={300}
          className="h-52 w-full rounded-[10px] object-cover"
        />

        <span
          style={{ backgroundColor: deal.badge }}
          className={`${deal.badgeText} absolute left-4 top-4 rounded-lg px-4 py-2 text-xs font-semibold uppercase`}
        >
          {deal.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <div className="h-[95px]">
          <h2 className="line-clamp-2 text-[20px] font-semibold leading-7">{deal.title}</h2>

          <p className="mt-2 line-clamp-2 font-medium text-black/50">{deal.description}</p>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm text-gray-500">Ends In</p>

          <Countdown />
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Package size={20} strokeWidth={1.8} className="text-gray-500" />
            <span className="font-medium">{deal.products} Products</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-500">
              <IndianRupee size={10} strokeWidth={2} className="font-medium text-gray-500" />
            </div>
            <span className="font-medium">{deal.minOrder}</span>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <button
            className={`flex items-center justify-center gap-4 rounded-xl py-3 font-semibold ${
              deal.buttonStyle === "orange"
                ? "bg-secondary text-white hover:bg-orange-600"
                : deal.buttonStyle === "yellow"
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : deal.buttonStyle === "primary"
                    ? "bg-primary text-white hover:opacity-90"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {(deal.buttonStyle === "yellow" || deal.buttonStyle === "primary") && (
              <Bell size={25} />
            )}

            {deal.button}
          </button>

          <button className="rounded-xl border border-gray-200 py-3 font-semibold hover:bg-gray-100">
            View Products
          </button>
        </div>
      </div>
    </div>
  );
}
