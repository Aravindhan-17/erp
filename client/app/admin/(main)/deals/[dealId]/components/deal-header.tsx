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
          className="bg-primary hover:bg-primary-hover shadow-primary/20 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-90"
        >
          Save deal
        </button>
      </div>
    </div>
  );
}
