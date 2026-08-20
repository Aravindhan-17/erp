import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Save, Calendar, Clock, Tag, Box } from "lucide-react";

type Props = {
  params: Promise<{
    dealId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const isNew = resolvedParams.dealId === "new";
  return {
    title: isNew ? "Create New Deal — FlashERP Admin" : "Edit Deal — FlashERP Admin",
    description: isNew ? "Create a new flash deal." : "Edit an existing flash deal.",
  };
}

export default async function ManageDealPage({ params }: Props) {
  const resolvedParams = await params;
  const isNew = resolvedParams.dealId === "new";
  const pageTitle = isNew ? "Create New Deal" : "Edit Deal";
  const pageDescription = isNew
    ? "Configure basic details, schedule, and add products."
    : "Update the configuration, schedule, and products for this deal.";

  return (
    <div className="mx-auto max-w-5xl font-poppins pb-10">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/deals"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 hover:text-gray-800 shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {pageDescription}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/deals"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-[#6734ed] to-[#5120d3] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Save size={16} />
            {isNew ? "Publish Deal" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT COLUMN: Details & Schedule */}
        <div className="space-y-8 lg:col-span-2">
          {/* BASIC DETAILS */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-50 bg-gray-50/50 px-6 py-4 flex items-center gap-2">
              <Tag size={18} className="text-gray-400" />
              <h2 className="text-base font-semibold text-gray-800">Basic Details</h2>
            </div>
            <div className="space-y-5 px-6 py-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Deal Title</label>
                <input
                  type="text"
                  placeholder="e.g. Monsoon Electronics Sale"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  placeholder="e.g. Up to 55% off TVs, laptops & audio"
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Registration Fee (₹)</label>
                  <input
                    type="number"
                    defaultValue={1}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Max Participants (Optional)</label>
                  <input
                    type="number"
                    placeholder="No limit"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-50 bg-gray-50/50 px-6 py-4 flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              <h2 className="text-base font-semibold text-gray-800">Schedule Configuration</h2>
            </div>
            <div className="space-y-6 px-6 py-6">
              
              {/* Registration Window */}
              <div className="rounded-xl border border-gray-100 p-4 bg-gray-50/30">
                <div className="mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-violet-500" />
                  <h3 className="text-sm font-semibold text-gray-800">Registration Window</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Starts</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Ends</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              {/* Deal Window */}
              <div className="rounded-xl border border-gray-100 p-4 bg-gray-50/30">
                <div className="mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  <h3 className="text-sm font-semibold text-gray-800">Flash Deal Window</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Starts</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">Ends</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Products */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-50 bg-gray-50/50 px-6 py-4 flex items-center gap-2">
              <Box size={18} className="text-gray-400" />
              <h2 className="text-base font-semibold text-gray-800">Products</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="text-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6">
                <Box size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-500 mb-4">No products added yet.</p>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-violet-600 hover:border-violet-200"
                >
                  Select Products
                </button>
              </div>

              {/* Dummy Selected Product */}
              <div className="rounded-xl border border-gray-100 p-3 flex items-start gap-3">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-100 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=120&q=80" alt="Product" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">UltraSound 65" 4K Smart TV</p>
                  <p className="text-xs text-gray-500">MRP: ₹89,999</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400">Flash Price</label>
                      <input type="text" defaultValue="52999" className="w-full text-xs border border-gray-200 rounded px-2 py-1 mt-0.5 outline-none focus:border-violet-500" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400">Allocated</label>
                      <input type="number" defaultValue="40" className="w-full text-xs border border-gray-200 rounded px-2 py-1 mt-0.5 outline-none focus:border-violet-500" />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
