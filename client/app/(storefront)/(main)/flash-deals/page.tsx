import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FeaturesBanner } from "../../components/features-banner";
import { FlashFilters } from "./components/flash-filters";
import { FlashCard } from "../../components/flash-card";
import { deals } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "Flash Deals — FlashERP",
  description: "View all active and upcoming flash deals.",
};

export default function FlashDealsPage() {
  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-10 md:px-8 xl:px-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="font-medium text-black">Flash Deals</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mb-10 flex flex-col gap-8">
        <div>
          <h1 className="font-poppins text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl xl:text-6xl">
            Flash Deals
          </h1>

          <p className="mt-2 text-sm font-medium text-black/50">
            Unbeatable deals for a limited time.
          </p>
        </div>
      </section>

      {/* Deals */}

      {/* Tabs + Sort */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* LEFT TABS */}
        <div className="flex flex-wrap gap-2">
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

        {/* RIGHT SORT */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-black/50">Sort by:</span>
          <select
            className="
    bg-black/2 
    rounded-lg 
    border 
    border-gray-200 
    px-4 
    py-2
    text-sm
    outline-none
    focus:border-gray-200
    focus:outline-none
    focus:ring-0
  "
          >
            {" "}
            <option>Start Time Earliest</option>
            <option>Start Time Latest</option>
            <option>Most Products</option>
          </select>
        </div>
      </div>

      {/* FILTER + CARDS */}
      <section className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[380px_1fr]">
        {/* LEFT FILTER */}
        <aside className="sticky top-24 h-fit">
          <FlashFilters />
        </aside>

        {/* RIGHT CARDS */}
        <div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {deals.map((deal) => (
              <FlashCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Features */}
      <div className="mt-10">
        <FeaturesBanner />
      </div>
    </div>
  );
}
