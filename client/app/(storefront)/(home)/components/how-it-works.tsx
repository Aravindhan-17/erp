"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const stepsData = [
  {
    id: 1,
    title: "Choose a Deal",
    description: "Browse and select a flash deal you like",
  },
  {
    id: 2,
    title: "Register for ₹ 1",
    description: "Pay just ₹ 1 to register for the deal",
  },
  {
    id: 3,
    title: "Shop When Live",
    description: "When the deal goes live, start shopping",
  },
  {
    id: 4,
    title: "Add to Cart",
    description: "Products are reserved for 10 minutes",
  },
  {
    id: 5,
    title: "Checkout",
    description: "Checkout within 10 minutes to confirm",
  },
];

export function HowItWorks() {
  return (
    <div className="w-460 max-w-full h-99.75 flex gap-15 opacity-100 mx-auto box-border relative">
      
      {/* First Layout */}
      <div className="w-143 max-w-full h-99.75 opacity-100 rounded-lg box-border relative overflow-hidden bg-[#240046]">
        
        {/* Mask group layout */}
        <div className="absolute inset-0 w-full h-full opacity-100">
          <Image
            src="/images/how-it-works-mask-group.svg"
            alt="Flash Deals background mask"
            fill
            className="object-cover"
          />
        </div>

        {/* First layout gradient */}
        <div 
          className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 50.13%, #000000 100%)" }}
        />

        {/* Content for first layout */}
        <div className="relative z-10 w-full h-full">
          {/* Inside first layout inner container */}
          <div className="absolute top-10 left-10 w-119.75 max-w-full h-51.5 flex flex-col gap-5 opacity-100 box-border">
            
            <div className="w-119.75 max-w-full h-9 opacity-100 box-border flex items-center">
              <h2 className="font-poppins font-bold text-2xl leading-none uppercase tracking-normal bg-white bg-clip-text text-transparent m-0">
                Be Ready. Be Fast. Get the best deals!
              </h2>
            </div>

            <div className="w-111 max-w-full h-15 opacity-100 box-border flex items-center">
              <p className="font-poppins font-medium text-xl leading-none tracking-normal bg-white bg-clip-text text-transparent m-0">
                Register for any flash deal with just ₹ 1<br />and get early access to unbelievable prices.
              </p>
            </div>

            <button className="w-56.75 max-w-full h-17.5 bg-secondary rounded-lg p-5 flex items-center justify-center gap-2.5 opacity-100 hover:bg-secondary/90 transition-colors box-border border-none cursor-pointer">
              <span className="w-46.75 h-7.5 font-poppins font-bold text-xl leading-none tracking-normal bg-white bg-clip-text text-transparent m-0 flex items-center justify-center">
                Explore Deals Now
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Second Layout */}
      <div className="w-307 max-w-full h-99.75 flex flex-col gap-10 p-10 opacity-100 rounded-lg box-border relative bg-[#4E148C08]">
        
        {/* First inner layout (Header) */}
        <div className="w-287 max-w-full h-12 opacity-100 box-border flex items-center">
          <h2 className="font-poppins font-bold text-3xl leading-none tracking-normal bg-black bg-clip-text text-transparent m-0">
            How Flash Deals Work?
          </h2>
        </div>

        {/* Second inner layout (Steps) */}
        <div className="w-287 max-w-full h-57.75 flex justify-between items-center opacity-100 box-border relative">
          
          {stepsData.map((step, index) => (
            <React.Fragment key={step.id}>
              
              {/* Step */}
              <div className="w-41 h-57.75 flex flex-col gap-2.5 opacity-100 box-border">
                {/* Number Circle */}
                <div className="w-25 h-25 bg-white rounded-[100px] border border-[#00000040] relative opacity-100 box-border mx-auto">
                  {/* Inner tinted circle */}
                  <div className="w-15 h-15 bg-primary opacity-10 rounded-[80px] absolute top-5 left-5 box-border" />
                  
                  {/* Number text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 box-border">
                    <span className="font-poppins font-semibold text-[28px] leading-none tracking-normal text-center text-primary m-0 block">
                      {step.id}
                    </span>
                  </div>
                </div>
                
                {/* Title layout */}
                <div className="w-41 max-w-full h-7.5 opacity-100 box-border flex items-center justify-center">
                  <h3 className="font-poppins font-semibold text-xl leading-none tracking-normal text-center bg-black bg-clip-text text-transparent m-0 w-full">
                    {step.title}
                  </h3>
                </div>

                {/* Subtext layout */}
                <div className="w-41 max-w-full h-20.25 opacity-50 box-border flex items-start justify-center">
                  <p className="font-poppins font-medium text-lg leading-normal tracking-normal text-center bg-black bg-clip-text text-transparent m-0 w-full whitespace-pre-wrap">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow (only render between steps) */}
              {index < 4 && (
                <div className="w-10.5 h-6 opacity-50 flex items-center justify-center box-border">
                  <ArrowRight className="w-full h-full text-primary" />
                </div>
              )}
              
            </React.Fragment>
          ))}

        </div>

      </div>

    </div>
  );
}
