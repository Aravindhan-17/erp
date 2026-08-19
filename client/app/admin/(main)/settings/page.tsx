import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — FlashERP Admin",
};

export default function SettingsPage() {
  return (
    <div className="font-poppins space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure platform defaults and system toggles.
          </p>
        </div>
      </div>

      <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white">
        <p className="text-sm font-medium text-gray-500">System Settings Content</p>
      </div>
    </div>
  );
}
