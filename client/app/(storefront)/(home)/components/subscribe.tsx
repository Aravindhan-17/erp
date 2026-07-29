import React from "react";
import {
  BadgeCheck,
  ShieldCheck,
  Headphones,
  IndianRupee,
  Mail,
} from "lucide-react";

import user1 from "../../../../public/images/user-1.svg";
import user2 from "../../../../public/images/user-2.svg";
import user3 from "../../../../public/images/user-3.svg";
import user4 from "../../../../public/images/user-4.svg";
import Image from "next/image";
import leftBg from "../../../../public/images/subscribe-image.png";
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
    <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-10 pt-8 pb-12 xl:pt-0 xl:pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* LEFT CARD */}
        <div className="relative rounded-2xl overflow-hidden min-h-130">


          {/* Background Image */}
          <Image
            src={leftBg}
            alt="Subscribe Background"
            fill
            className="object-cover"
          />



          {/* Overlay Content */}
          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-8 p-8 lg:p-12 h-full">



            {/* FEATURES */}
            <div>


              <h2 className="text-2xl lg:text-3xl font-bold mb-10">
                Why Shop with ERP Flash Deal?
              </h2>



              <div className="space-y-8">


                {
                  features.map((item,index)=>{


                    const Icon = item.icon;


                    return (

                      <div
                        key={index}
                        className="flex gap-4"
                      >


                        <div className="w-14 h-14 rounded-full bg-[#77B90040] flex items-center justify-center shrink-0">


                          <Icon
                            className="w-6 h-6 text-[#2F8F00]"
                            strokeWidth={2}
                          />


                        </div>



                        <div>


                          <h4 className="font-semibold text-lg">
                            {item.title}
                          </h4>


                          <p className="text-[15px] leading-6 text-black/50 mt-1">
                            {item.desc}
                          </p>


                        </div>


                      </div>

                    )

                  })
                }


              </div>

            </div>
           
          </div>
        </div>



        {/* Right Side */}
        <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-center">
          <div className="w-14 h-14 rounded-xl border-2 border-orange-500 flex items-center justify-center mb-8">
            <Mail className="text-orange-500 w-7 h-7" />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Never Miss a Deal!
          </h2>

          <p className="text-gray-500 leading-7 mb-8">
            Subscribe to get notified about upcoming flash deals and
            exclusive offers.
          </p>

          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-orange-500 mb-4"
          />

          <button className="w-full bg-secondary text-white font-semibold py-4 rounded-xl transition">
            Subscribe Now
          </button>

          {/* Subscribers */}
          <div className="flex items-center mt-8">
            <div className="flex -space-x-3">
              <Image
                src={user1}
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <Image
                src={user2}
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <Image
                src={user3}
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <Image
                src={user4}
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
            </div>

            <p className="ml-4 font-semibold text-gray-700">
              50K+ Happy Subscribers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;