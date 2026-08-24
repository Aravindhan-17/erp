import { CalendarDays, Clock3 } from "lucide-react";

export function DealSchedule() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-50 bg-gray-50/50 px-6 py-4 flex items-center gap-2">
        <CalendarDays size={18} className="text-gray-400" />
        <h2 className="text-base font-semibold text-gray-800">
          Schedule Configuration
        </h2>
      </div>  
      <div className="space-y-6 px-6 py-6">
        {/* Registration Window */}
        <div className="rounded-xl border border-gray-100 p-4 bg-gray-50/30">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-gray-800">
              Registration Window
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Starts
              </label>
              <input
                type="datetime-local"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Ends
              </label>
              <input
                type="datetime-local"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
