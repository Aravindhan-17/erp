import React from "react";
import { IndianRupee, Clock3, Package, ShieldCheck, Star } from "lucide-react";

export const features = [
  {
    icon: IndianRupee,
    title: "₹ 1",
    subtitle: "Registration Fee",
    desc: "One-time payment & non-refundable",
  },
  {
    icon: Clock3,
    title: "10 Min",
    subtitle: "Cart Reservation",
    desc: "Limited time to complete checkout",
  },
  {
    icon: Package,
    title: "Min. Order Value",
    subtitle: "₹ 5,000 or 2 Products",
    desc: "Whichever is higher",
  },
  {
    icon: Star,
    title: "Top Brands",
    subtitle: "Genuine products",
    desc: "& trusted sellers",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    subtitle: "100% safe",
    desc: "& secure payments",
  },
];

export function FeaturesBanner() {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {features.map((item, index) => {
        const Icon = item.icon;

        return (
          <div key={index} className="flex gap-4">
            <div className="my-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-100">
              <Icon size={24} strokeWidth={2} className="text-primary" />
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
              <p className="text-sm leading-snug text-black/90 ">{item.subtitle}</p>
              <p className="text-sm leading-snug text-black/90 ">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
