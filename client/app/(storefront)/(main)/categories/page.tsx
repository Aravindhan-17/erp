import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories — FlashERP",
  description: "Browse products by categories.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-black">Categories</h1>
      <p className="text-foreground/75">Explore our wide range of product categories.</p>
      {/* Categories grid/list will go here */}
    </div>
  );
}
