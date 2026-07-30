import { Metadata } from "next";
import { FeaturesBanner } from "../../components/features-banner";
import { FlashFilters } from "../../(main)/flash-deals/flashfilters";
import { FlashCard } from "../../components/flash-card";
import { Product1, Product2, Product3, Product4 } from "@/assets/images";


export const metadata: Metadata = {
  title: "Flash Deals — FlashERP",
  description: "View all active and upcoming flash deals.",
};

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


export default function FlashDealsPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1920px] px-4 md:px-8 xl:px-10 px-4 py-10">

      {/* Hero */}
      <section className="flex flex-col gap-8 rounded-2xl mb-10 lg:flex-row lg:items-center">
        <div className="lg:w-72">
          <h1 className="text-4xl font-black">
            Flash Deals
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Unbeatable deals for a limited time.
          </p>
        </div>

        <div className="flex-1">
          <FeaturesBanner />
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

  <span className="text-sm font-medium text-black/50">
    Sort by:
  </span>
<select
  className="
    rounded-lg 
    border 
    border-gray-200 
    bg-black/2 
    px-4 
    py-2
    outline-none
    text-sm
    focus:outline-none
    focus:ring-0
    focus:border-gray-200
  "
>  <option>Start Time Earliest</option>
  <option>Start Time Latest</option>
  <option>Most Products</option>
</select>
</div>

</div>


{/* FILTER + CARDS */}
<section className="grid gap-8 lg:grid-cols-[280px_1fr]">

  {/* LEFT FILTER */}
  <aside className="sticky top-24 h-fit">
    <FlashFilters />
  </aside>


  {/* RIGHT CARDS */}
  <div>

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {deals.map((deal) => (
        <FlashCard 
          key={deal.id} 
          deal={deal} 
        />
      ))}

    </div>

  </div>

</section>

    </div>
  );
}