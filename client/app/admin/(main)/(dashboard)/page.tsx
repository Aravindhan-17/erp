import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Admin Dashboard — FlashERP",
  description: "Real-time flash deal monitoring, inventory locks, and financial ledgers.",
};

export default function AdminDashboardPage() {
  return (
    <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white">
      <p className="text-sm font-medium text-gray-500">Dashboard Content Area</p>
    </div>
  );
}
