"use client";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { FlashCard } from "@/app/(storefront)/components/flash-card";
import Image from "next/image";
import { Product1, Product2, Product3, Product4 } from "@/assets/images";
const deals = [
  {
    id: 1,
    status: "Live Now",
    badge: "#017B24",
    badgeText: "text-white",
    image: Product1,
    title: "Summer Electronics Flash Sale",
    description: "Unbeatable deals on top electronics.",
    products: 12,
    minOrder: "Min. Order ₹ 5,000",
    button: "Register for ₹1",
    buttonStyle: "orange",
    type: "live",
  },
  {
    id: 2,
    status: "Starting Soon",
    badge: "#FEB305",
    badgeText: "text-black",
    image: Product2,
    title: "Home Appliances Bonanza",
    description: "Exclusive discounts on premium appliances.",
    products: 20,
    minOrder: "Min. Order ₹ 5,000",
    button: "Notify Me",
    buttonStyle: "yellow",
    type: "starting",
  },
  {
    id: 3,
    status: "Upcoming",
    badge: " #4E148C",
    badgeText: "text-white",
    image: Product3,
    title: "Fashion Mega Deals",
    description: "Trending styles at crazy prices.",
    products: 18,
    minOrder: "Min. Order ₹ 5,000",
    button: "Notify Me",
    buttonStyle: "primary",
    type: "upcoming",
  },
  {
    id: 4,
    status: "Ended",
    badge: "#555555",
    badgeText: "text-white",
    image: Product4,
    title: "Smartphone Clearance",
    description: "This flash deal has ended.",
    products: 15,
    minOrder: "Min. Order ₹ 5,000",
    button: "Closed",
    buttonStyle: "white",
    type: "ended",
  },
];


export function FlashDeals() {
  return (
    <section className="xl:h-200 relative mx-auto flex w-full max-w-[1920px] items-center justify-center px-4 pb-12 pt-8 md:px-8 xl:px-10 xl:pb-0 xl:pt-0">
      <div className="mx-auto w-full">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div>
            <span className="text-3xl font-bold tracking-wider">Flash Deals</span>
          </div>

          <button className="text-secondary mt-5 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold md:mt-0">
            View All Deals
            <ChevronRight size={26} />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-4">
          <button className="text-secondary rounded-xl bg-[#F3380B1A] px-6 py-3 font-semibold hover:bg-gray-100">
            All Deals
          </button>

          <button className="rounded-xl px-6 py-3 font-semibold hover:bg-gray-100">Live Now</button>

          <button className="rounded-xl px-6 py-3 font-semibold hover:bg-gray-100">
            Starting Soon
          </button>

          <button className="rounded-xl px-6 py-3 font-semibold hover:bg-gray-100">Upcoming</button>

          <button className="rounded-xl px-6 py-3 font-semibold hover:bg-gray-100">Ended</button>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal) => (
            <FlashCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </section>
  );
}
