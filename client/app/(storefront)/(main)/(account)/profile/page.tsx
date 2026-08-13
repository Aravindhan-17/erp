"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UserAvatar } from "@/assets/images";
import { Camera, Save, Lock, Smartphone, Monitor, User } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1992-08-15",
    gender: "Male"
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to save profile
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update password
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile & Security</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your personal details, login credentials, and account security.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Side: Profile Information & Auth Widgets */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
              <User size={18} className="text-gray-400" />
            </div>
            
            <form onSubmit={handleProfileUpdate} className="p-6 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b border-gray-100 pb-8">
                <div className="relative group cursor-pointer">
                  <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-gray-50">
                    <Image src={UserAvatar} alt="User" width={112} height={112} className="h-full w-full object-cover group-hover:opacity-75 transition-opacity" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="rounded-full bg-black/50 p-2 text-white">
                      <Camera size={20} />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 w-full flex flex-col justify-center">
                  <h3 className="font-semibold text-gray-900">Profile Picture</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-3">Upload a new avatar. Larger image will be resized automatically.</p>
                  <p className="text-xs text-gray-400">Maximum upload size is 2 MB. JPEG, PNG, or GIF allowed.</p>
                  <div className="flex gap-3 mt-4">
                    <button type="button" className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                      Upload new
                    </button>
                    <button type="button" className="rounded-xl px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    value={user.firstName}
                    onChange={(e) => setUser({...user, firstName: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    value={user.lastName}
                    onChange={(e) => setUser({...user, lastName: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    value={user.dob}
                    onChange={(e) => setUser({...user, dob: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-900" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select 
                    value={user.gender}
                    onChange={(e) => setUser({...user, gender: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Auth Widgets underneath Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Two-Factor Authentication */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Two-Factor Auth</h2>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account. We'll ask for a code in addition to your password.</p>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-gray-100 p-2 text-gray-500">
                        <Smartphone size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Authenticator App</p>
                        <p className="text-xs text-gray-500">Not configured</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full rounded-xl border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  Enable 2FA
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Active Sessions</h2>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Monitor size={18} className="text-primary" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Mac OS Safari</p>
                      <p className="text-xs text-gray-500">San Francisco, CA • Current</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <Smartphone size={18} className="text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">iPhone 14 Pro Max</p>
                      <p className="text-xs text-gray-500">San Jose, CA • 2 hours ago</p>
                    </div>
                  </div>
                </div>
                <button className="w-full rounded-xl border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  Sign Out All Devices
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Security / Password & Danger Zone */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Security</h2>
              <Lock size={18} className="text-gray-400" />
            </div>
            
            <form onSubmit={handlePasswordUpdate} className="p-6 flex flex-col gap-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                />
              </div>
              
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                  />
                  <p className="mt-2 text-xs text-gray-500">Must be at least 8 characters long and contain a number.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                  <Lock size={16} />
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-800 shadow-sm">
            <h3 className="font-bold mb-2">Danger Zone</h3>
            <p className="text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
