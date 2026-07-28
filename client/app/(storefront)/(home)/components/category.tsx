import React from "react";
import {
  Smartphone,
  CookingPot,
  ShoppingBag,
  Watch,
  Sparkles,
  Trophy,
  IndianRupee,
  Clock3,
  Package,
  ShieldCheck,
  Star,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

import electronics from "../../../../public/images/Category-1.svg";
import homeAppliances from "../../../../public/images/Category-2.svg";
import fashion from "../../../../public/images/Category-3.svg";
import accessories from "../../../../public/images/Category-4.svg";
import beauty from "../../../../public/images/Category-5.svg";
import sports from "../../../../public/images/Category-6.svg";

const categories = [
  {
    title: "Electronics",
    products: 121,
    image: electronics,
  },
  {
    title: "Home Appliances",
    products: 88,
    image: homeAppliances,
  },
  {
    title: "Fashion",
    products: 156,
    image: fashion,
  },
  {
    title: "Accessories",
    products: 95,
    image: accessories,
  },
  {
    title: "Beauty",
    products: 79,
    image: beauty,
  },
  {
    title: "Sports",
    products: 32,
    image: sports,
  },
];

const features = [
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
const Category = () => {
  return (
<section className="relative w-full max-w-[1920px] mx-auto xl:h-[800px] px-4 md:px-8 xl:px-10 pt-8 pb-12 xl:pt-0 xl:pb-0">
  <div className="w-full mx-auto">
          {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Shop by Category</h2>

         <button className="mt-5 md:mt-0 text-secondary px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
             View All Deals
             <ChevronRight size={26} />
          </button>
      </div>

      {/* Categories */}
     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
  {categories.map((item, index) => (
    <div
      key={index}
      className="border border-gray-200 rounded-2xl bg-white p-6 text-center hover:shadow-lg transition duration-300"
    >
      <div className="flex justify-center mb-5">
        <Image
          src={item.image}
          alt={item.title}
          className="w-50 h-30 object-contain"
        />
      </div>

      <h3 className="font-semibold text-lg">{item.title}</h3>

      <p className="text-black/50 font-medium text-sm mt-1">
        {item.products} Products
      </p>
    </div>
  ))}
</div>

      {/* Bottom Features */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-gray-200 rounded-2xl bg-white p-6">
        
  {features.map((item, index) => {
    const Icon = item.icon;

    return (
      <div key={index} className="flex gap-4 ">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-violet-100 flex-shrink-0 my-auto">
  <Icon
    size={24}
    strokeWidth={2}
    className="text-primary"
  />
</div>

        <div>
          <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
          <p className="text-sm text-black/90 leading-[22px] ">{item.subtitle}</p>
          <p className="text-sm text-black/90 leading-[22px] ">{item.desc}</p>
        </div>
      </div>
    );
  })}
  
</div>
</div>
    </section>
  );
};

export default Category;