"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HowItWorksMask } from "@/assets/images";

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
    <section className="relative mx-auto w-full max-w-[1920px] px-4 pb-12 pt-8 md:px-8 xl:px-10 xl:pb-0 xl:pt-0">
      <div className="xl:gap-15 relative mx-auto box-border flex w-full flex-col gap-8 opacity-100 lg:flex-row lg:gap-10">
        {/* First Layout - Banner */}
        <div className="lg:w-85 xl:w-143 min-h-87.5 xl:h-99.75 relative box-border flex w-full shrink-0 flex-col justify-center overflow-hidden rounded-lg bg-[#240046] p-6 opacity-100 lg:h-auto lg:p-8 xl:p-10">
          {/* Mask group layout */}
          <div className="absolute inset-0 h-full w-full opacity-100">
            <Image
              src={HowItWorksMask}
              alt="Flash Deals background mask"
              fill
              className="object-cover"
            />
          </div>

          {/* First layout gradient */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
            style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 50.13%, #000000 100%)" }}
          />

          {/* Content for first layout */}
          <div className="relative z-10 flex w-full flex-col gap-4 lg:gap-3 xl:gap-5">
            <h2 className="font-poppins xl:text-7 max-w-100 m-0 bg-white bg-clip-text text-2xl font-bold uppercase leading-tight tracking-normal text-transparent lg:text-xl">
              Be Ready. Be Fast. Get the best deals!
            </h2>

            <p className="font-poppins max-w-95 m-0 bg-white bg-clip-text text-lg font-medium leading-snug tracking-normal text-transparent lg:text-base xl:text-xl">
              Register for any flash deal with just ₹ 1<br className="hidden sm:block" />
              and get early access to unbelievable prices.
            </p>

            <button className="bg-secondary hover:bg-secondary/90 mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg border-none px-8 py-4 transition-colors sm:w-fit lg:px-6 lg:py-3 xl:px-8 xl:py-4">
              <span className="font-poppins m-0 bg-white bg-clip-text text-lg font-bold leading-none text-transparent lg:text-base xl:text-xl">
                Explore Deals Now
              </span>
            </button>
          </div>
        </div>

        {/* Second Layout - Steps Section */}
        <div className="xl:max-w-307 lg:min-h-99.75 xl:h-99.75 relative box-border flex h-auto w-full flex-1 flex-col justify-center gap-8 rounded-lg bg-[#4E148C08] p-6 opacity-100 lg:max-w-none lg:p-8 xl:gap-10 xl:p-10">
          {/* Header */}
          <div className="box-border flex w-full items-center justify-center lg:justify-start">
            <h2 className="font-poppins m-0 bg-black bg-clip-text text-center text-2xl font-bold leading-none tracking-normal text-transparent lg:text-left lg:text-xl xl:text-3xl">
              How Flash Deals Work?
            </h2>
          </div>

          {/* Steps Grid */}
          <div className="relative mt-4 box-border flex h-auto w-full flex-col items-center justify-between gap-8 opacity-100 md:mt-0 md:flex-row md:items-start md:gap-2 xl:gap-0">
            {stepsData.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step */}
                <div className="sm:w-41 xl:w-41 box-border flex w-full flex-col items-center gap-3 opacity-100 md:flex-1 xl:flex-none xl:gap-2.5">
                  {/* Number Circle */}
                  <div className="md:w-17.5 md:h-17.5 xl:w-25 xl:h-25 relative box-border h-20 w-20 shrink-0 rounded-full border border-[#00000040] bg-white opacity-100">
                    {/* Inner tinted circle */}
                    <div className="md:w-10.5 md:h-10.5 xl:w-15 xl:h-15 bg-primary absolute left-4 top-4 h-12 w-12 rounded-full opacity-10 md:left-3.5 md:top-3.5 xl:left-5 xl:top-5" />

                    {/* Number text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-poppins text-6 md:text-5 xl:text-7 text-primary m-0 block text-center font-semibold leading-none">
                        {step.id}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mt-1 flex w-full items-center justify-center xl:mt-0">
                    <h3 className="font-poppins m-0 w-full bg-black bg-clip-text px-2 text-center text-lg font-semibold leading-tight text-transparent md:text-sm xl:px-0 xl:text-xl">
                      {step.title}
                    </h3>
                  </div>

                  {/* Subtext */}
                  <div className="flex w-full items-start justify-center opacity-50">
                    <p className="font-poppins m-0 w-full whitespace-pre-wrap bg-black bg-clip-text px-4 text-center text-base font-medium leading-snug text-transparent md:px-1 md:text-[11px] xl:px-0 xl:text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow separator (rotated on mobile) */}
                {index < 4 && (
                  <div className="xl:w-10.5 mt-8 hidden shrink-0 items-center justify-center opacity-50 md:flex md:h-4 md:w-6 xl:mt-10 xl:h-6">
                    <ArrowRight className="text-primary h-full w-full transition-transform" />
                  </div>
                )}
                {index < 4 && (
                  <div className="my-2 flex shrink-0 items-center justify-center opacity-50 md:hidden">
                    <ArrowRight className="text-primary h-8 w-8 rotate-90 transition-transform" />
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
