
import {  useParams  } from "@tanstack/react-router";

const categories = [
  { id: "electronics", label: "Electronics" },
  { id: "home-appliances", label: "Home Appliances" },
  { id: "fashion", label: "Fashion" },
  { id: "furniture", label: "Furniture" },
  { id: "beauty", label: "Beauty" },
  { id: "sports", label: "Sports" },
  { id: "accessories", label: "Accessories" },
  { id: "automotive", label: "Automotive" },
];

const brands = [
  { label: "Dell", count: 38 },
  { label: "Apple", count: 24 },
  { label: "Samsung", count: 32 },
  { label: "HP", count: 18 },
  { label: "Sony", count: 22 },
  { label: "LG", count: 16 },
  { label: "Bose", count: 14 },
];

export function CategoryIdFilters() {
  const params = useParams({ strict: false });
  const currentCategory = params.id;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Filters</h3>

        <button className="text-secondary text-sm font-medium hover:underline">Clear All</button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="mb-4 font-semibold text-gray-900">Categories</h4>

        <div className="space-y-3">
          {categories.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={currentCategory === item.id}
                  readOnly
                  className="h-4 w-4 rounded border-gray-300 accent-[#7C3AED]"
                />

                <span
                  className={`text-sm ${
                    currentCategory === item.id ? "font-medium text-[#7C3AED]" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Brand */}
      <div>
        <h4 className="mb-4 font-semibold text-gray-900">Brand</h4>

        <div className="space-y-3">
          {brands.map((item) => (
            <label key={item.label} className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-[#7C3AED]"
                />

                <span className="text-sm text-gray-700">{item.label}</span>
              </div>

              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Price */}
      <div>
        <h4 className="mb-5 font-semibold">Product Count</h4>
        <input
          type="range"
          min={0}
          max={1000}
          className="h-2.5 w-full appearance-none bg-transparent pt-2.5 opacity-100 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-[#F3380B] [&::-moz-range-track]:h-0 [&::-moz-range-track]:w-full [&::-moz-range-track]:border-[3px] [&::-moz-range-track]:border-solid [&::-moz-range-track]:border-[#F3380B] [&::-webkit-slider-runnable-track]:h-0 [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:border-[3px] [&::-webkit-slider-runnable-track]:border-solid [&::-webkit-slider-runnable-track]:border-[#F3380B] [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F3380B]"
        />
        <div className="mt-2 flex justify-between text-sm">
          <span>0</span>
          <span>1000+</span>
        </div>
      </div>

      {/* Apply */}
      <button className="bg-secondary mt-8 w-full rounded-xl py-3 font-semibold text-white transition hover:opacity-90">
        Apply Filters
      </button>
    </div>
  );
}
