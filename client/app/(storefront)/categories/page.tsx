import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories — FlashERP",
  description: "Browse products by categories.",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black mb-8">Categories</h1>
      <p className="text-foreground/75">
        Explore our wide range of product categories.
      </p>
      {/* Categories grid/list will go here */}
    </div>
  );
}
