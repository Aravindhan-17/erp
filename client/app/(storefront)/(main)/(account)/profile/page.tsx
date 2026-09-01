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
    gender: "Male",
    profileImage: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to save profile
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update password
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/api/customer/profile/image", {
        method: "POST",
        // Note: For a real app, you would include auth headers here (e.g. Authorization: Bearer ...)
        // Currently it's simulated as we are using credentials with cors
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      setUser({ ...user, profileImage: `http://localhost:3001${result.data.profileImage}` });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile & Security</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal details, login credentials, and account security.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Side: Profile Information & Auth Widgets */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
              <User size={18} className="text-gray-400" />
            </div>

            <form onSubmit={handleProfileUpdate} className="flex flex-col gap-6 p-6">
              <div className="flex flex-col items-center gap-8 border-b border-gray-100 pb-8 sm:flex-row sm:items-start">
                <div className="group relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-gray-50">
                    <Image
                      src={user.profileImage || UserAvatar}
                      alt="User"
                      width={112}
                      height={112}
                      className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-full bg-black/50 p-2 text-white">
                      <Camera size={20} />
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-1 flex-col justify-center">
                  <h3 className="font-semibold text-gray-900">Profile Picture</h3>
                  <p className="mb-3 mt-1 text-sm text-gray-500">
                    Upload a new avatar. Larger image will be resized automatically.
                  </p>
                  <p className="text-xs text-gray-400">
                    Maximum upload size is 2 MB. JPEG, PNG, or GIF allowed.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={handleImageUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                      {isUploading ? "Uploading..." : "Upload new"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setUser({ ...user, profileImage: "" })}
                      className="rounded-xl px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={user.dob}
                    onChange={(e) => setUser({ ...user, dob: e.target.value })}
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:ring-1"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    value={user.gender}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:ring-1"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-primary flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Auth Widgets underneath Personal Info */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Two-Factor Authentication */}
            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-base font-bold text-gray-900">Two-Factor Auth</h2>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="mb-4 text-sm text-gray-500">
                    Add an extra layer of security to your account. We&apos;ll ask for a code in
                    addition to your password.
                  </p>
                  <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-gray-100 p-2 text-gray-500">
                        <Smartphone size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Authenticator App</p>
                        <p className="text-xs text-gray-500">Not configured</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full rounded-xl border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50">
                  Enable 2FA
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-base font-bold text-gray-900">Active Sessions</h2>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="mb-4 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Monitor size={18} className="text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Mac OS Safari</p>
                      <p className="text-xs text-gray-500">San Francisco, CA • Current</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <Smartphone size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">iPhone 14 Pro Max</p>
                      <p className="text-xs text-gray-500">San Jose, CA • 2 hours ago</p>
                    </div>
                  </div>
                </div>
                <button className="w-full rounded-xl border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50">
                  Sign Out All Devices
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Security / Password & Danger Zone */}
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Security</h2>
              <Lock size={18} className="text-gray-400" />
            </div>

            <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-6 p-6">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <a href="#" className="text-primary text-xs font-medium hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                />
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Must be at least 8 characters long and contain a number.
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Lock size={16} />
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-800 shadow-sm">
            <h3 className="mb-2 font-bold">Danger Zone</h3>
            <p className="mb-4 text-sm">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
