import React, { useState } from "react";
import { Bell, Mail, Smartphone, RefreshCw, Save } from "lucide-react";

type PreferenceType = {
  email: boolean;
  sms: boolean;
  push: boolean;
};

export function NotificationsPage() {
  const [preferences, setPreferences] = useState({
    transactional: {
      orders: { email: true, sms: true, push: true },
      delivery: { email: true, sms: true, push: true },
    },
    marketing: {
      newsletter: { email: true, sms: false, push: false },
      promotions: { email: false, sms: false, push: true },
    },
    activity: {
      wishlist: { email: true, sms: false, push: true },
      security: { email: true, sms: true, push: true },
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (
    category: keyof typeof preferences,
    item: string,
    channel: keyof PreferenceType
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: {
          ...(prev[category] as Record<string, Record<string, boolean>>)[item],
          [channel]: !(prev[category] as Record<string, Record<string, boolean>>)[item][channel],
        },
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  const renderToggle = (checked: boolean, disabled: boolean = false) => (
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-gray-200"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Preferences</h1>
          <p className="mt-1 text-sm text-gray-500">
            Control how and when we communicate with you.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-70"
        >
          {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
          {isSaving ? "Saving..." : "Save Preferences"}
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:max-w-4xl">
        {/* Transactional */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">Transactional (Required)</h2>
            <p className="mt-1 text-xs text-gray-500">
              Essential updates regarding your purchases and account.
            </p>
          </div>

          <div className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/50 p-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:grid">
              <div className="col-span-6">Notification Type</div>
              <div className="col-span-2 flex items-center justify-center gap-1.5 text-center">
                <Mail size={14} /> Email
              </div>
              <div className="col-span-2 flex items-center justify-center gap-1.5 text-center">
                <Smartphone size={14} /> SMS
              </div>
              <div className="col-span-2 flex items-center justify-center gap-1.5 text-center">
                <Bell size={14} /> Push
              </div>
            </div>

            {/* Orders */}
            <div className="grid grid-cols-1 items-center gap-4 border-b border-gray-100 p-6 sm:grid-cols-12">
              <div className="col-span-1 mb-4 sm:col-span-6 sm:mb-0">
                <p className="font-semibold text-gray-900">Order Updates</p>
                <p className="text-sm text-gray-500">
                  Confirmations, cancellations, and refund processing.
                </p>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">Email</span>
                <div onClick={() => {}}>{renderToggle(true, true)}</div>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">SMS</span>
                <div onClick={() => handleToggle("transactional", "orders", "sms")}>
                  {renderToggle(preferences.transactional.orders.sms)}
                </div>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">Push</span>
                <div onClick={() => handleToggle("transactional", "orders", "push")}>
                  {renderToggle(preferences.transactional.orders.push)}
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-12">
              <div className="col-span-1 mb-4 sm:col-span-6 sm:mb-0">
                <p className="font-semibold text-gray-900">Delivery Status</p>
                <p className="text-sm text-gray-500">
                  Shipping updates, out for delivery, and delivered notices.
                </p>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">Email</span>
                <div onClick={() => {}}>{renderToggle(true, true)}</div>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">SMS</span>
                <div onClick={() => handleToggle("transactional", "delivery", "sms")}>
                  {renderToggle(preferences.transactional.delivery.sms)}
                </div>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">Push</span>
                <div onClick={() => handleToggle("transactional", "delivery", "push")}>
                  {renderToggle(preferences.transactional.delivery.push)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">Marketing & Promos</h2>
            <p className="mt-1 text-xs text-gray-500">
              Updates on sales, new arrivals, and special events.
            </p>
          </div>

          <div className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/50 p-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:grid">
              <div className="col-span-6">Notification Type</div>
              <div className="col-span-2 flex items-center justify-center gap-1.5 text-center">
                <Mail size={14} /> Email
              </div>
              <div className="col-span-2 flex items-center justify-center gap-1.5 text-center">
                <Smartphone size={14} /> SMS
              </div>
              <div className="col-span-2 flex items-center justify-center gap-1.5 text-center">
                <Bell size={14} /> Push
              </div>
            </div>

            {/* Newsletter */}
            <div className="grid grid-cols-1 items-center gap-4 border-b border-gray-100 p-6 sm:grid-cols-12">
              <div className="col-span-1 mb-4 sm:col-span-6 sm:mb-0">
                <p className="font-semibold text-gray-900">Weekly Newsletter</p>
                <p className="text-sm text-gray-500">
                  Curated products, trends, and stories from our brand.
                </p>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">Email</span>
                <div onClick={() => handleToggle("marketing", "newsletter", "email")}>
                  {renderToggle(preferences.marketing.newsletter.email)}
                </div>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">SMS</span>
                <div onClick={() => handleToggle("marketing", "newsletter", "sms")}>
                  {renderToggle(preferences.marketing.newsletter.sms)}
                </div>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">Push</span>
                <div onClick={() => handleToggle("marketing", "newsletter", "push")}>
                  {renderToggle(preferences.marketing.newsletter.push)}
                </div>
              </div>
            </div>

            {/* Promotions */}
            <div className="grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-12">
              <div className="col-span-1 mb-4 sm:col-span-6 sm:mb-0">
                <p className="font-semibold text-gray-900">Flash Sales & Promos</p>
                <p className="text-sm text-gray-500">
                  Exclusive discount codes and early access to sales.
                </p>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">Email</span>
                <div onClick={() => handleToggle("marketing", "promotions", "email")}>
                  {renderToggle(preferences.marketing.promotions.email)}
                </div>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">SMS</span>
                <div onClick={() => handleToggle("marketing", "promotions", "sms")}>
                  {renderToggle(preferences.marketing.promotions.sms)}
                </div>
              </div>
              <div className="col-span-1 flex items-center gap-3 sm:col-span-2 sm:justify-center">
                <span className="w-16 text-sm font-medium text-gray-500 sm:hidden">Push</span>
                <div onClick={() => handleToggle("marketing", "promotions", "push")}>
                  {renderToggle(preferences.marketing.promotions.push)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
