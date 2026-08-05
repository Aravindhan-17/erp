"use client";

const industries = [
  { label: "Retail", count: 42 },
  { label: "Wholesale", count: 28 },
  { label: "B2B", count: 15 },
];

const statuses = [
  { label: "Active", color: "bg-[#017B24]", count: 85 },
  { label: "Upcoming", color: "bg-[#F3380B]", count: 12 },
  { label: "Archived", color: "bg-[#555555]", count: 5 },
];

export function CategoryFilters() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Filters</h3>
        <button className="text-secondary text-sm font-medium hover:underline">Clear All</button>
      </div>

      {/* Industry Type */}
      <div>
        <h4 className="mb-4 font-semibold">Industry Type</h4>
        <div className="space-y-3">
          {industries.map((item) => (
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

      {/* Category Status */}
      <div>
        <h4 className="mb-4 font-semibold">Category Status</h4>
        <div className="space-y-3">
          {statuses.map((item) => (
            <label key={item.label} className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span className={`h-3 w-3 rounded-full ${item.color}`} />
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

      {/* Product Count Slider */}
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

      {/* Button */}
      <button className="bg-secondary mt-8 w-full rounded-xl py-3 font-semibold text-white transition hover:opacity-90">
        Apply Filters
      </button>
    </div>
  );
}
