import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ledgers & GST Reports — FlashERP Admin",
};

export default function FinancePage() {
  return (
    <div className="space-y-8 font-poppins">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Ledgers & GST Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Analyze financial performance and generate tax compliance reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-primary hover:opacity-90 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow transition-all">
            Export GST Report
          </button>
        </div>
      </div>
      
      <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white">
        <p className="text-sm font-medium text-gray-500">Finance & Ledgers Content</p>
      </div>
    </div>
  );
}
