import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flash Deal Engine — FlashERP Admin",
};

export default function DealsPage() {
  return (
    <div className="font-poppins space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Flash Deal Engine
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Schedule and monitor high-traffic flash sales events.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-primary rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow transition-all hover:opacity-90">
            + Schedule New Deal
          </button>
        </div>
      </div>

      <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white">
        <p className="text-sm font-medium text-gray-500">Flash Deal Engine Content</p>
      </div>
    </div>
  );
}
