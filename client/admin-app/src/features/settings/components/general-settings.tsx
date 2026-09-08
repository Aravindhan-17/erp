export function GeneralSettings() {
  return (
    <div className="w-full max-w-147.5 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_4px_20px_rgba(30,20,80,0.04)] sm:p-6">
      <h2 className="mb-5 text-lg font-bold text-gray-900">General</h2>

      {/* PLATFORM NAME */}
      <div className="mb-5">
        <label htmlFor="platform-name" className="mb-2 block text-xs font-semibold text-gray-600">
          Platform name
        </label>
        <input
          id="platform-name"
          type="text"
          defaultValue="ERP Flash Deal"
          className="focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-800 outline-none transition focus:ring-2"
        />
      </div>

      {/* SUPPORT EMAIL */}
      <div className="mb-5">
        <label htmlFor="support-email" className="mb-2 block text-xs font-semibold text-gray-600">
          Support email
        </label>
        <input
          id="support-email"
          type="email"
          defaultValue="support@erpflashdeal.com"
          className="focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-800 outline-none transition focus:ring-2"
        />
      </div>

      {/* REGISTRATION FEE + RESERVATION */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="registration-fee" className="mb-2 block text-xs font-semibold text-gray-600">
            Default registration fee (₹)
          </label>
          <input
            id="registration-fee"
            type="number"
            defaultValue="1"
            className="focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-800 outline-none transition focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="reservation" className="mb-2 block text-xs font-semibold text-gray-600">
            Default reservation (minutes)
          </label>
          <input
            id="reservation"
            type="number"
            defaultValue="10"
            className="focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-800 outline-none transition focus:ring-2"
          />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-5 border-t border-gray-100" />

      {/* DEAL START NOTIFICATIONS */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h3 className="text-sm font-bold text-gray-800">Deal start notifications</h3>
          <p className="mt-1 text-xs text-gray-500">Notify registered customers at launch.</p>
        </div>
        <div className="bg-primary relative h-7 w-12 shrink-0 rounded-full shadow-sm">
          <div className="absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow" />
        </div>
      </div>

      {/* AUTOMATIC STOCK RELEASE */}
      <div className="flex items-center justify-between gap-4 py-5">
        <div>
          <h3 className="text-sm font-bold text-gray-800">Automatic stock release</h3>
          <p className="mt-1 text-xs text-gray-500">Return expired reservations to available stock.</p>
        </div>
        <div className="bg-primary relative h-7 w-12 shrink-0 rounded-full shadow-sm">
          <div className="absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow" />
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button
        type="button"
        className="bg-primary rounded-xl px-6 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(91,45,220,0.25)] transition hover:opacity-90 active:scale-[0.98]"
      >
        Save changes
      </button>
    </div>
  );
}
