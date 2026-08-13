import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Electronics, Gadgets, NewArivals } from "@/assets/images";

const banners = [
  {
    title: "Top Deals",
    subtitle: "On Electronics",
    image: Electronics,
  },
  {
    title: "Up to 60% Off",
    subtitle: "On Gadgets",
    image: Gadgets,
  },
  {
    title: "New Arrivals",
    subtitle: "Just For You",
    image: NewArivals,
  },
];

export function PromoBanners() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {banners.map((banner) => (
        <div
          key={banner.title}
          className="
          relative 
          h-[260px]
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r 
          from-[#111827]
          via-[#1F2937]
          to-[#374151]
          p-8
          text-white
          "
        >
          {/* Background Image */}
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="
              object-cover
              opacity-60
            "
          />

          {/* Dark Overlay */}
          <div
            className="
            absolute
            inset-0
            bg-black/30
          "
          />

          {/* Content */}
          <div className="relative z-10 max-w-[200px]">
            <div className="h-30">
              <h2 className="text-4xl font-bold leading-tight">{banner.title}</h2>
              <p className="mt-2 text-lg text-white/80">{banner.subtitle}</p>
            </div>

            <button
              className="
              mt-6
              flex
              items-center
              gap-2
              rounded-xl
              bg-[#F3380B]
              px-5
              py-3
              font-semibold
              transition
              hover:opacity-90
              "
            >
              Shop Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
