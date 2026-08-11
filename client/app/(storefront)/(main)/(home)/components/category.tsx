import React from "react";
import { ChevronRight } from "lucide-react";
import { FeaturesBanner } from "@/app/(storefront)/components/features-banner";
import { CategoryCard } from "@/app/(storefront)/components/category-card";
import { categories } from "@/lib/dummy-data";
import Link from "next/link";

const Category = () => {
  return (
    <section className="relative mx-auto h-auto w-full max-w-[1920px] px-4 md:px-8 xl:px-10">
      <div className="mx-auto w-full">
        {/* Heading */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Shop by Category</h2>

          <Link href="/categories">
            <button className="text-secondary mt-5 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold hover:underline md:mt-0">
              View All Categories
              <ChevronRight size={26} />
            </button>
          </Link>
        </div>

        {/* Categories */}
        <div className="mb-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 6).map((item) => (
            <CategoryCard key={item.id} category={item} />
          ))}
        </div>

        {/* Bottom Features */}
        <FeaturesBanner />
      </div>
    </section>
  );
};

export default Category;
