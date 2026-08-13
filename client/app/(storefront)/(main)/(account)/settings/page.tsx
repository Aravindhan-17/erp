"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell, Shield, Mail, Key, Smartphone, Download, Trash2, Link as LinkIcon, Settings2 } from "lucide-react";
import { GoogleIcon, FacebookIcon, AppleIcon } from "@/assets/images";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Update your security, login, and notification preferences.</p>
      </div>

      <div className="grid gap-6">
        
        {/* Security & Login */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-secondary/10 p-2 text-secondary">
              <Shield size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Security & Login</h2>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <Mail className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Email Address</p>
                  <p className="text-sm text-gray-500 mt-1">john.doe@example.com</p>
                </div>
              </div>
              <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Change Email
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <Key className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Password</p>
                  <p className="text-sm text-gray-500 mt-1">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Update Password
              </button>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-4">
                <Smartphone className="text-gray-400 mt-1" size={20} />
                <div className="max-w-md">
                  <p className="font-semibold text-gray-900">Two-Factor Authentication (2FA)</p>
                  <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                </div>
              </div>
              <button 
                onClick={() => setTwoFactor(!twoFactor)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
                  twoFactor ? 'bg-secondary' : 'bg-gray-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  twoFactor ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-secondary/10 p-2 text-secondary">
              <LinkIcon size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Connected Accounts</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">Link your social accounts for quicker, more secure logins.</p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-4 text-center">
              <Image src={GoogleIcon} alt="Google" width={32} height={32} />
              <p className="text-sm font-semibold text-gray-900">Google</p>
              <button className="text-xs font-medium text-gray-500 hover:text-red-500 transition-colors">Disconnect</button>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-4 text-center">
              <Image src={FacebookIcon} alt="Facebook" width={32} height={32} />
              <p className="text-sm font-semibold text-gray-900">Facebook</p>
              <button className="text-xs font-medium text-secondary hover:underline transition-all">Connect</button>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-4 text-center">
              <Image src={AppleIcon} alt="Apple" width={32} height={32} />
              <p className="text-sm font-semibold text-gray-900">Apple</p>
              <button className="text-xs font-medium text-secondary hover:underline transition-all">Connect</button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-secondary/10 p-2 text-secondary">
              <Bell size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-gray-900">Order Updates (Email)</p>
                <p className="text-sm text-gray-500 mt-1">Receive emails about your order status.</p>
              </div>
              <button 
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
                  emailNotifications ? 'bg-secondary' : 'bg-gray-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  emailNotifications ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">Order Updates (SMS)</p>
                <p className="text-sm text-gray-500 mt-1">Receive text messages about your order status.</p>
              </div>
              <button 
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
                  smsNotifications ? 'bg-secondary' : 'bg-gray-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  smsNotifications ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">Marketing & Promotions</p>
                <p className="text-sm text-gray-500 mt-1">Receive exclusive offers and flash deals.</p>
              </div>
              <button 
                onClick={() => setMarketingEmails(!marketingEmails)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
                  marketingEmails ? 'bg-secondary' : 'bg-gray-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  marketingEmails ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-gray-100 p-2 text-gray-700">
              <Settings2 size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Data & Privacy</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">Export Account Data</p>
              <p className="text-sm text-gray-500 mt-1">Download a copy of your personal data and order history.</p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Download size={16} />
              Request Export
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
            <div>
              <p className="font-semibold text-red-600">Delete Account</p>
              <p className="text-sm text-gray-500 mt-1">Permanently delete your account and all associated data.</p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end mt-2">
          <button className="bg-secondary rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity">
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
