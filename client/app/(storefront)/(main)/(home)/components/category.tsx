import React from "react";
import { ChevronRight } from "lucide-react";
import { FeaturesBanner } from "@/app/(storefront)/components/features-banner";
import Image from "next/image";

import {
  CategoryElectronics as electronics,
  CategoryHomeAppliances as homeAppliances,
  CategoryFashion as fashion,
  CategoryAccessories as accessories,
  CategoryBeauty as beauty,
  CategorySports as sports,
} from "@/assets/images";

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

const Category = () => {
  return (
    <section className="relative mx-auto h-auto w-full max-w-[1920px] px-4 pb-12 pt-8 md:px-8 xl:px-10 xl:pb-0 xl:pt-0">
      <div className="mx-auto w-full">
        {/* Heading */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Shop by Category</h2>

          <button className="text-secondary mt-5 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold md:mt-0">
            View All Deals
            <ChevronRight size={26} />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition duration-300 hover:shadow-lg"
            >
              <div className="mb-5 flex justify-center">
                <Image src={item.image} alt={item.title} className="w-50 h-30 object-contain" />
              </div>

              <h3 className="text-lg font-semibold">{item.title}</h3>

              <p className="mt-1 text-sm font-medium text-black/50">{item.products} Products</p>
            </div>
          ))}
        </div>

        {/* Bottom Features */}
        <FeaturesBanner />
      </div>
    </section>
  );
};

export default Category;
