import Image from "next/image";
import React from "react";

const brandImages = [
  "/images/top-brand-1.svg",
  "/images/top-brand-2.svg",
  "/images/top-brand-3.svg",
  "/images/top-brand-4.svg",
  "/images/top-brand-5.svg",
  "/images/top-brand-6.svg",
  "/images/top-brand-7.svg",
  "/images/top-brand-8.svg",
];

export function TopBrands() {
  return (
    <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-10 pt-8 pb-12 xl:pt-0 xl:pb-0">
      <div className="w-full h-auto xl:h-37 flex flex-col gap-4 xl:gap-10 opacity-100 rotate-0 mx-auto box-border">
        {/* Text Layout */}
        <div className="w-full xl:h-12 rotate-0 opacity-100 flex items-center justify-center box-border mb-2 md:mb-0">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl xl:text-[32px] leading-none tracking-normal text-center text-[#000000] m-0">
            Top Brands You Love
          </h2>
        </div>

        {/* Second Layout - Brands Container (Marquee) */}
        <div className="w-full h-12 md:h-14 xl:h-15 flex items-center opacity-100 rotate-0 box-border overflow-hidden relative">
          <div className="flex items-center w-max animate-marquee gap-4 md:gap-6 xl:gap-8">
            {[...Array(2)].map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {brandImages.map((src, idx) => (
                  <div 
                    key={`${groupIndex}-${idx}`} 
                    className="w-40 h-8 md:w-56 md:h-10 xl:w-78 xl:h-12 opacity-100 rotate-0 flex items-center justify-center gap-2.5 shrink-0"
                  >
                    <Image 
                      src={src} 
                      alt={`Brand ${idx + 1}`} 
                      width={312} 
                      height={48} 
                      className="w-full h-full object-contain"
                      unoptimized
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
