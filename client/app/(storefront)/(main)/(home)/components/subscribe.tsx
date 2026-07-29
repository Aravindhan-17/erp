import React from "react";
import { BadgeCheck, ShieldCheck, Headphones, IndianRupee, Mail } from "lucide-react";

import Image from "next/image";
import {
  User1 as user1,
  User2 as user2,
  User3 as user3,
  User4 as user4,
  SubscribeImage as leftBg,
} from "@/assets/images";
// import shieldBg from "@/assets/shield-bg.png";
const features = [
  {
    icon: IndianRupee,
    title: "Amazing Prices",
    desc: "Unbelievable deals on top products",
  },
  {
    icon: BadgeCheck,
    title: "Verified & Original",
    desc: "100% genuine products from top brands",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Safe",
    desc: "Your security is our priority",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "We're here to help you 24/7",
  },
];

const Subscribe = () => {
  return (
    <section className="relative mx-auto w-full max-w-[1920px] px-4 pb-12 pt-8 md:px-8 xl:px-10 xl:pb-0 xl:pt-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        {/* LEFT CARD */}
        <div className="min-h-130 relative overflow-hidden rounded-2xl">
          {/* Background Image */}
          <Image src={leftBg} alt="Subscribe Background" fill className="object-cover" />

          {/* Overlay Content */}
          <div className="relative z-10 grid h-full items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
            {/* FEATURES */}
            <div>
              <h2 className="mb-10 text-2xl font-bold lg:text-3xl">
                Why Shop with ERP Flash Deal?
              </h2>

              <div className="space-y-8">
                {features.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#77B90040]">
                        <Icon className="h-6 w-6 text-[#2F8F00]" strokeWidth={2} />
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold">{item.title}</h4>

                        <p className="mt-1 text-[15px] leading-6 text-black/50">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center rounded-2xl bg-gray-50 p-8">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-orange-500">
            <Mail className="h-7 w-7 text-orange-500" />
          </div>

          <h2 className="mb-4 text-3xl font-bold">Never Miss a Deal!</h2>

          <p className="mb-8 leading-7 text-gray-500">
            Subscribe to get notified about upcoming flash deals and exclusive offers.
          </p>

          <input
            type="email"
            placeholder="Enter your email address"
            className="mb-4 w-full rounded-xl border border-gray-200 px-5 py-4 outline-none focus:border-orange-500"
          />

          <button className="bg-secondary w-full rounded-xl py-4 font-semibold text-white transition">
            Subscribe Now
          </button>

          {/* Subscribers */}
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-3">
              <Image src={user1} className="h-10 w-10 rounded-full border-2 border-white" alt="" />
              <Image src={user2} className="h-10 w-10 rounded-full border-2 border-white" alt="" />
              <Image src={user3} className="h-10 w-10 rounded-full border-2 border-white" alt="" />
              <Image src={user4} className="h-10 w-10 rounded-full border-2 border-white" alt="" />
            </div>

            <p className="ml-4 font-semibold text-gray-700">50K+ Happy Subscribers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
