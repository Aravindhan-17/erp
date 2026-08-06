import { Metadata } from "next";
import { CategoryProductFilters } from "../components/category-product-filters";
import { ProductCard } from "../../../components/product-card";
import { products } from "../../flash-deals/products/lib/product-data";
import { PaginationClient } from "../../../components/pagination-client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const decodedId = decodeURIComponent(params.id);
  return {
    title: `${decodedId} — FlashERP`,
    description: `Browse all products in ${decodedId} category.`,
  };
}

export default async function CategoryPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const decodedId = decodeURIComponent(params.id);

  // Example: Duplicate the 4 products to fill out the grid
  const displayProducts = [...products, ...products, ...products];

  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-10 md:px-8 xl:px-10">
      {/* Breadcrumbs */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/categories" className="hover:text-black">
            Categories
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-black capitalize">{decodedId}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mb-10 flex flex-col gap-8">
        <div>
          <h1 className="font-poppins text-3xl font-bold capitalize leading-tight text-gray-900 sm:text-4xl md:text-5xl xl:text-6xl">
            {decodedId}
          </h1>

          <p className="mt-2 text-sm font-medium text-black/50">
            Explore our wide range of products in the {decodedId} category.
          </p>
        </div>
      </section>

      {/* Tabs + Sort */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* LEFT RESULTS COUNT */}
        <div className="flex flex-wrap gap-2">
          <span className="font-medium text-black/70">
            Showing 1 - {displayProducts.length} of {displayProducts.length} results
          </span>
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
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* FILTER + CARDS */}
      <section className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[380px_1fr]">
        {/* LEFT FILTER */}
        <aside className="sticky top-24 h-fit hidden lg:block">
          <CategoryProductFilters />
        </aside>

        {/* RIGHT CARDS */}
        <div>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {displayProducts.map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} product={product} />
            ))}
          </div>
          
          <PaginationClient pageCount={10} />
        </div>
      </section>

    </div>
  );
}
