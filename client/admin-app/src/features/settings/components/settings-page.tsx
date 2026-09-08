import { useState } from "react";
import { Settings, Users, CreditCard, Bell } from "lucide-react";
import { GeneralSettings } from "./general-settings";
import { StaffManagement } from "./staff-management";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "staff", label: "Staff", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="font-poppins min-w-0">
      {/* HEADER */}
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">Platform and administrative configuration.</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* TABS SIDEBAR */}
        <div className="w-full shrink-0 lg:w-64">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* TAB CONTENT */}
        <div className="flex-1 min-w-0">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "staff" && <StaffManagement />}
          
          {/* Placeholders for future tabs */}
          {activeTab === "payments" && (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-500">
              Payment Gateway configurations coming soon...
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-500">
              SMTP and Notification Rules coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}