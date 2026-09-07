import React from "react";

import {
  TopBrand1,
  TopBrand2,
  TopBrand3,
  TopBrand4,
  TopBrand5,
  TopBrand6,
  TopBrand7,
  TopBrand8,
} from "@/assets/images";

const brandImages = [
  TopBrand1,
  TopBrand2,
  TopBrand3,
  TopBrand4,
  TopBrand5,
  TopBrand6,
  TopBrand7,
  TopBrand8,
];

export function TopBrands() {
  return (
    <section className="relative mx-auto w-full max-w-[1920px] px-4 md:px-8 xl:px-10">
      <div className="xl:h-37 mx-auto box-border flex h-auto w-full rotate-0 flex-col gap-4 opacity-100 xl:gap-10">
        {/* Text Layout */}
        <div className="mb-2 box-border flex w-full rotate-0 items-center justify-center opacity-100 md:mb-0 xl:h-12">
          <h2 className="font-poppins m-0 text-center text-2xl font-bold leading-none tracking-normal text-[#000000] md:text-3xl xl:text-[32px]">
            Top Brands You Love
          </h2>
        </div>

        {/* Second Layout - Brands Container (Marquee) */}
        <div className="xl:h-15 relative box-border flex h-12 w-full rotate-0 items-center overflow-hidden opacity-100 md:h-14">
          <div className="animate-marquee flex w-max items-center gap-4 md:gap-6 xl:gap-8">
            {[...Array(2)].map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {brandImages.map((src, idx) => (
                  <div
                    key={`${groupIndex}-${idx}`}
                    className="xl:w-78 flex h-8 w-40 shrink-0 rotate-0 items-center justify-center gap-2.5 opacity-100 md:h-10 md:w-56 xl:h-12"
                  >
                    <img
                      src={src}
                      alt={`Brand ${idx + 1}`}
                      width={312}
                      height={48}
                      className="h-full w-full object-contain"
                      
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
