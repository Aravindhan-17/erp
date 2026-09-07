
import { CalendarDays } from "lucide-react";

const statuses = [
  { label: "Live Now", color: "bg-[#017B24]", count: 5 },
  { label: "Starting Soon", color: "bg-[#F3380B]", count: 6 },
  { label: "Upcoming", color: "bg-[#4E148C]", count: 8 },
  { label: "Ended", color: "bg-[#555555]", count: 12 },
];

const categories = [
  { label: "Electronics", count: 24 },
  { label: "Home Appliances", count: 18 },
  { label: "Fashion", count: 22 },
  { label: "Furniture", count: 14 },
  { label: "Beauty", count: 11 },
];

export function FlashFilters() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Filters</h3>

        <button className="text-secondary text-sm font-medium hover:underline">Clear All</button>
      </div>

      {/* Deal Status */}
      <div>
        <h4 className="mb-4 font-semibold">Deal Status</h4>

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

      {/* Categories */}
      <div>
        <h4 className="mb-4 font-semibold">Categories</h4>

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

        <button className="text-secondary mt-4 text-sm font-medium hover:underline">
          + View More
        </button>
      </div>

      <hr className="my-6" />

      {/* Date */}
      <div>
        <h4 className="mb-4 font-semibold">Deal Start & End Date</h4>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              className="w-full rounded-lg border border-gray-200 px-3 py-3 pr-10 text-sm outline-none"
            />

            <CalendarDays
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <span>to</span>

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              className="w-full rounded-lg border border-gray-200 px-3 py-3 pr-10 text-sm outline-none"
            />

            <CalendarDays
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Slider */}
      <div>
        <h4 className="mb-5 font-semibold">Min. Order Value</h4>

        <input
          type="range"
          min={1000}
          max={50000}
          className="w-full cursor-pointer accent-[#F3380B]"
        />

        <div className="mt-2 flex justify-between text-sm">
          <span>₹ 1,000</span>
          <span>₹ 50,000+</span>
        </div>
      </div>

      {/* Button */}
      <button className="bg-secondary mt-8 w-full rounded-xl py-3 font-semibold text-white transition hover:opacity-90">
        Apply Filters
      </button>
    </div>
  );
}
