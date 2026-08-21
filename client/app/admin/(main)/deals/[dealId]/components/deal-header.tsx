
export function DealHeader() {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Create new flash deal
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          The right panel updates instantly to match the customer experience.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300"
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-xl bg-gradient-to-r from-[#6631e8] to-[#5120d3] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(102,49,232,0.25)] transition hover:opacity-90"
        >
          Save deal
        </button>
      </div>
    </div>
  );
}
