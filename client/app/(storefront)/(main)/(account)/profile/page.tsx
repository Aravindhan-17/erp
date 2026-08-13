"use client";

import React from "react";
import Image from "next/image";
import { UserAvatar } from "@/assets/images";
import { MapPin, CreditCard, Edit2, Wallet } from "lucide-react";

export default function ProfilePage() {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "August 15, 1992",
    gender: "Male"
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Personal Information Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
            <button className="flex items-center gap-2 text-sm font-medium text-secondary hover:underline transition-all">
              <Edit2 size={16} />
              Edit
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-gray-50">
              <Image src={UserAvatar} alt="User" width={96} height={96} className="h-full w-full object-cover" />
            </div>
            
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
                <div>
                  <p className="text-xs font-medium text-gray-500">First Name</p>
                  <p className="font-semibold text-gray-900 mt-1">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Last Name</p>
                  <p className="font-semibold text-gray-900 mt-1">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Email Address</p>
                  <p className="font-semibold text-gray-900 mt-1">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Phone Number</p>
                  <p className="font-semibold text-gray-900 mt-1">{user.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Date of Birth</p>
                  <p className="font-semibold text-gray-900 mt-1">{user.dob}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Gender</p>
                  <p className="font-semibold text-gray-900 mt-1">{user.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet & Store Credit Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Wallet & Store Credit</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-6 text-center h-40">
            <div className="mb-3 rounded-full bg-green-100 p-2 text-green-600">
              <Wallet size={24} />
            </div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Available Balance</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">$120.50</p>
          </div>
        </div>

        {/* Address Book Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Default Address</h2>
            <button className="flex items-center gap-2 text-sm font-medium text-secondary hover:underline transition-all">
              <Edit2 size={16} />
              Manage
            </button>
          </div>
          
          <div className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-6 h-40">
            <div className="mt-1 shrink-0 text-secondary">
              <MapPin size={24} />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="font-semibold text-gray-900">Home</span>
                <span className="rounded-full bg-[#F3380B1A] px-2 py-0.5 text-[10px] font-bold text-secondary uppercase tracking-wider">Default</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                123 E-commerce St, Suite 100<br />
                San Francisco, CA 94107<br />
                United States
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
            <button className="flex items-center gap-2 text-sm font-medium text-secondary hover:underline transition-all">
              <Edit2 size={16} />
              Manage
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex w-full sm:w-1/2 lg:w-1/3 gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 items-center">
              <div className="shrink-0 h-10 w-14 bg-white rounded shadow-sm flex items-center justify-center border border-gray-200">
                <CreditCard size={24} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Visa ending in 4242</span>
                </div>
                <p className="text-xs text-gray-500">Expires 12/24</p>
              </div>
            </div>
            <button className="flex w-full sm:w-1/2 lg:w-1/3 items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm font-medium text-gray-600 hover:border-secondary hover:text-secondary transition-colors">
              + Add New Method
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
