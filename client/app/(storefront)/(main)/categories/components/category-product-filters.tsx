"use client";

const brands = [
  { label: "Apple", count: 120 },
  { label: "Samsung", count: 85 },
  { label: "Sony", count: 42 },
  { label: "Dell", count: 28 },
];

const categories = [
  { label: "Smartphones", count: 320 },
  { label: "Laptops", count: 150 },
  { label: "Headphones", count: 95 },
  { label: "Accessories", count: 210 },
];

const ratings = [
  { label: "4 Stars & Up", value: 4 },
  { label: "3 Stars & Up", value: 3 },
  { label: "2 Stars & Up", value: 2 },
];

export function CategoryProductFilters() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Filters</h3>
        <button className="text-secondary text-sm font-medium hover:underline">Clear All</button>
      </div>

      {/* Sub-Categories */}
      <div>
        <h4 className="mb-4 font-semibold">Category</h4>
        <div className="space-y-3">
          {categories.map((item) => (
            <label key={item.label} className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* Brand */}
      <div>
        <h4 className="mb-4 font-semibold">Brand</h4>
        <div className="space-y-3">
          {brands.map((item) => (
            <label key={item.label} className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* Price Range Slider */}
      <div>
        <h4 className="mb-5 font-semibold">Price Range (₹)</h4>
        <input
          type="range"
          min={0}
          max={100000}
          className="w-full cursor-pointer accent-[#F3380B]"
        />
        <div className="mt-2 flex justify-between text-sm">
          <span>0</span>
          <span>1,00,000+</span>
        </div>
      </div>

      <hr className="my-6" />

      {/* Rating */}
      <div>
        <h4 className="mb-4 font-semibold">Rating</h4>
        <div className="space-y-3">
          {ratings.map((item) => (
            <label key={item.value} className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="rating"
                className="text-secondary focus:ring-secondary h-4 w-4 border-gray-300"
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Button */}
      <button className="bg-secondary mt-8 w-full rounded-xl py-3 font-semibold text-white transition hover:opacity-90">
        Apply Filters
      </button>
    </div>
  );
}
