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
    <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-10 pt-8 pb-12 xl:pt-0 xl:pb-0">
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-15 opacity-100 mx-auto box-border relative">
      {/* First Layout - Banner */}
      <div className="w-full lg:w-85 xl:w-143 min-h-87.5 lg:h-auto xl:h-99.75 opacity-100 rounded-lg box-border relative overflow-hidden bg-[#240046] flex flex-col justify-center p-6 lg:p-8 xl:p-10 shrink-0">
        
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
        <div className="relative z-10 w-full flex flex-col gap-4 lg:gap-3 xl:gap-5">
          <h2 className="font-poppins font-bold text-2xl lg:text-xl xl:text-7 leading-tight uppercase tracking-normal bg-white bg-clip-text text-transparent m-0 max-w-100">
            Be Ready. Be Fast. Get the best deals!
          </h2>

          <p className="font-poppins font-medium text-lg lg:text-base xl:text-xl leading-snug tracking-normal bg-white bg-clip-text text-transparent m-0 max-w-95">
            Register for any flash deal with just ₹ 1<br className="hidden sm:block" />and get early access to unbelievable prices.
          </p>

          <button className="w-full sm:w-fit bg-secondary rounded-lg px-8 lg:px-6 xl:px-8 py-4 lg:py-3 xl:py-4 flex items-center justify-center hover:bg-secondary/90 transition-colors border-none cursor-pointer mt-2">
            <span className="font-poppins font-bold text-lg lg:text-base xl:text-xl leading-none bg-white bg-clip-text text-transparent m-0">
              Explore Deals Now
            </span>
          </button>
        </div>
      </div>

      {/* Second Layout - Steps Section */}
      <div className="flex-1 w-full lg:max-w-none xl:max-w-307 h-auto lg:min-h-99.75 xl:h-99.75 flex flex-col gap-8 xl:gap-10 p-6 lg:p-8 xl:p-10 opacity-100 rounded-lg box-border relative bg-[#4E148C08] justify-center">
        
        {/* Header */}
        <div className="w-full box-border flex items-center justify-center lg:justify-start">
          <h2 className="font-poppins font-bold text-2xl lg:text-xl xl:text-3xl leading-none tracking-normal bg-black bg-clip-text text-transparent m-0 text-center lg:text-left">
            How Flash Deals Work?
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center md:items-start opacity-100 box-border relative gap-8 md:gap-2 xl:gap-0 mt-4 md:mt-0">
          
          {stepsData.map((step, index) => (
            <React.Fragment key={step.id}>
              
              {/* Step */}
              <div className="w-full sm:w-41 md:flex-1 xl:flex-none xl:w-41 flex flex-col items-center gap-3 xl:gap-2.5 opacity-100 box-border">
                {/* Number Circle */}
                <div className="w-20 h-20 md:w-17.5 md:h-17.5 xl:w-25 xl:h-25 bg-white rounded-full border border-[#00000040] relative opacity-100 box-border shrink-0">
                  {/* Inner tinted circle */}
                  <div className="w-12 h-12 md:w-10.5 md:h-10.5 xl:w-15 xl:h-15 bg-primary opacity-10 rounded-full absolute top-4 left-4 md:top-3.5 md:left-3.5 xl:top-5 xl:left-5" />
                  
                  {/* Number text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-poppins font-semibold text-6 md:text-5 xl:text-7 leading-none text-center text-primary m-0 block">
                      {step.id}
                    </span>
                  </div>
                </div>
                
                {/* Title */}
                <div className="w-full flex items-center justify-center mt-1 xl:mt-0">
                  <h3 className="font-poppins font-semibold text-lg md:text-sm xl:text-xl leading-tight text-center bg-black bg-clip-text text-transparent m-0 w-full px-2 xl:px-0">
                    {step.title}
                  </h3>
                </div>

                {/* Subtext */}
                <div className="w-full opacity-50 flex items-start justify-center">
                  <p className="font-poppins font-medium text-base md:text-[11px] xl:text-lg leading-snug text-center bg-black bg-clip-text text-transparent m-0 w-full whitespace-pre-wrap px-4 md:px-1 xl:px-0">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow separator (rotated on mobile) */}
              {index < 4 && (
                <div className="hidden md:flex md:w-6 md:h-4 xl:w-10.5 xl:h-6 opacity-50 items-center justify-center shrink-0 mt-8 xl:mt-10">
                  <ArrowRight className="w-full h-full text-primary transition-transform" />
                </div>
              )}
              {index < 4 && (
                <div className="flex md:hidden opacity-50 items-center justify-center shrink-0 my-2">
                  <ArrowRight className="w-8 h-8 text-primary rotate-90 transition-transform" />
                </div>
              )}
              
            </React.Fragment>
          ))}

        </div>

      </div>

    </div>
    </section>
  );
}
