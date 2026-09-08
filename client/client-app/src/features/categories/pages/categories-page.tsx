import { FeaturesBanner } from '@/features/home/components/features-banner';
import { CategoryFilters } from '@/features/categories/components/category-filters';
import { CategoryCard } from '@/features/categories/components/category-card';
import { categories } from "@/lib/dummy-data";



export function CategoriesPage() {
  return (
    <div className="font-poppins relative mx-auto w-full max-w-[1920px] px-4 py-10 md:px-8 xl:px-10">
      {/* Hero */}
      <section className="mb-10 flex flex-col gap-8">
        <div>
          <h1 className="font-poppins text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl xl:text-6xl">
            Categories
          </h1>

          <p className="mt-2 text-sm font-medium text-black/50">
            Explore our wide range of product categories.
          </p>
        </div>
      </section>

      {/* Tabs + Sort */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* LEFT TABS */}
        <div className="flex flex-wrap gap-2">
          <button className="text-secondary rounded-xl bg-[#F3380B1A] px-6 py-3 font-semibold hover:bg-gray-100">
            All Categories
          </button>
          <button className="rounded-xl px-6 py-3 font-semibold hover:bg-gray-100">Popular</button>
          <button className="rounded-xl px-6 py-3 font-semibold hover:bg-gray-100">New</button>
          <button className="rounded-xl px-6 py-3 font-semibold hover:bg-gray-100">A-Z</button>
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
            <option>Most Products</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
          </select>
        </div>
      </div>

      {/* FILTER + CARDS */}
      <section className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[380px_1fr]">
        {/* LEFT FILTER */}
        <aside className="sticky top-24 h-fit">
          <CategoryFilters />
        </aside>

        {/* RIGHT CARDS */}
        <div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Features */}
      <div className="mt-10">
        <FeaturesBanner />
      </div>
    </div>
  );
}
