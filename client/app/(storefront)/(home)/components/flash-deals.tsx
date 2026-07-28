"use client"
import { useEffect, useState } from "react";
import { Package, IndianRupee, Bell, ChevronRight} from "lucide-react";
import Image from "next/image";
const deals = [
  {
    id: 1,
    status: "Live Now",
    badge: "#017B24",
    badgeText: "text-white",
    image: "/images/product-1.svg",
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
    image: "/images/product-2.svg",
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
    image: "/images/product-3.svg",
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
    image: "/images/product-4.svg",
    title: "Smartphone Clearance",
    description: "This flash deal has ended.",
    products: 15,
    minOrder: "Min. Order ₹ 5,000",
    button: "Closed",
     buttonStyle: "white",
    type: "ended",
  },
];
const tabs = [
  { id: "all", label: "All Deals" },
  { id: "live", label: "Live Now" },
  { id: "starting", label: "Starting Soon" },
  { id: "upcoming", label: "Upcoming" },
  { id: "ended", label: "Ended" },
];


function Countdown() {
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
  <div className="flex items-center gap-[33px] mt-2 text-[11px] uppercase text-gray-500 font-medium">
    <span>HRS</span>
    <span>MIN</span>
    <span>SEC</span>
  </div>
</div>
  );
}

function FlashCard({ deal }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg duration-300 p-3 h-full flex flex-col">

      <div className="relative">

        <Image
  src={deal.image}
  alt={deal.title}
  width={500}
  height={300}
  className="w-full h-52 object-cover rounded-[10px]"
/>

        <span
  style={{ backgroundColor: deal.badge }}
  className={`${deal.badgeText} absolute top-4 left-4 px-4 py-2 rounded-lg text-xs font-semibold uppercase`}
>
  {deal.status}
</span>
      </div>

      <div className="pt-3 flex flex-col flex-1">

      <div className="h-[95px]">
        <h2 className="font-semibold text-[20px] leading-7 line-clamp-2">
          {deal.title}
        </h2>

        <p className="mt-2 text-black/50 font-medium line-clamp-2">
          {deal.description}
        </p>
        </div>

        <div className="mt-5">

          <p className="text-gray-500 text-sm mb-2">
            Ends In
          </p>

          <Countdown />

        </div>
<div className="flex justify-between items-center mt-6 text-sm text-gray-600">

  <div className="flex items-center gap-2">
    <Package size={20} strokeWidth={1.8} className="text-gray-500" />
    <span className="font-medium">{deal.products} Products</span>
  </div>

  <div className="flex items-center gap-1">
    <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center">
      <IndianRupee size={10} strokeWidth={2} className="text-gray-500 font-medium"/>
    </div>
    <span className="font-medium">{deal.minOrder}</span>
  </div>

</div>
<div className="grid grid-cols-2 gap-3 mt-auto pt-6">

  <button
    className={`rounded-xl py-3 font-semibold flex items-center justify-center gap-4 ${
      deal.buttonStyle === "orange"
        ? "bg-secondary hover:bg-orange-600 text-white"
        : deal.buttonStyle === "yellow"
        ? "bg-yellow-400 hover:bg-yellow-500 text-black"
        : deal.buttonStyle === "primary"
        ? "bg-primary hover:opacity-90 text-white"
        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
    }`}
  >
    {(deal.buttonStyle === "yellow" || deal.buttonStyle === "primary") && (
      <Bell size={25} />
    )}

    {deal.button}
  </button>


  <button className="border border-gray-200 rounded-xl py-3 hover:bg-gray-100 font-semibold">
    View Products
  </button>

</div>

      </div>

    </div>
  );
}

export function FlashDeals() {

  return (
       <section className="relative w-full max-w-[1920px] mx-auto xl:h-200 px-4 md:px-8 xl:px-10 flex items-center justify-center pt-8 pb-12 xl:pt-0 xl:pb-0">

   <div className="w-full mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div>

            <span className="text-3xl font-bold tracking-wider">

              Flash Deals

            </span>
          </div>

          <button className="mt-5 md:mt-0 text-secondary px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
             View All Deals
             <ChevronRight size={26} />
          </button>

        </div>

<div className="flex flex-wrap gap-4 mt-5">

  <button className="px-6 py-3 rounded-xl font-semibold bg-[#F3380B1A] text-secondary hover:bg-gray-100">
    All Deals
  </button>

  <button className="px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
    Live Now
  </button>

  <button className="px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">   
     Starting Soon
  </button>

  <button className="px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
    Upcoming
  </button>

  <button className="px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
    Ended
  </button>

</div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 mt-10">

  {deals.map((deal) => (

    <FlashCard key={deal.id} deal={deal} />

  ))}

</div>

      </div>

    </section>
  );
}
