"use client";

import { Clock, IndianRupee, Package, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BannerImg1, BannerImg2, BannerImg3 } from "@/assets/images";

const SLIDES = [
  {
    title: "Summer Electronics\nFlash Sale",
    subtitle: "Unbeatable deals on top electronics",
    bgImage: BannerImg1,
    fee: "₹ 1",
    minOrder: "₹ 5,000",
  },
  {
    title: "Premium Gadgets\nClearance",
    subtitle: "Huge discounts on laptops and more",
    bgImage: BannerImg2,
    fee: "Free",
    minOrder: "₹ 2,000",
  },
  {
    title: "Smart Home\nFestival",
    subtitle: "Transform your home with smart tech",
    bgImage: BannerImg3,
    fee: "₹ 50",
    minOrder: "₹ 10,000",
  },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full max-w-[1920px] mx-auto xl:h-200 px-4 md:px-8 xl:px-10 flex items-center justify-center pt-8 pb-12 xl:pt-0 xl:pb-0">
      <div 
        className="w-full h-full max-w-[1840px] mx-auto rounded-3xl relative overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y w-full h-full">
          {SLIDES.map((slide, index) => (
            <div 
              key={index} 
              className="relative flex-[0_0_100%] min-w-0 p-8 xl:p-20 flex flex-col justify-center h-full min-h-150 xl:min-h-full overflow-hidden"
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src={slide.bgImage}
                  alt={slide.title.replace('\n', ' ')}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent from-[15.38%] to-black/50 to-[81.11%]" />
              </div>
              <div className="flex flex-col w-full max-w-7xl gap-6 md:gap-8 xl:gap-10 relative z-10 pb-10">
                <div className="flex flex-col w-full max-w-2xl gap-3 md:gap-4 xl:gap-5">
                  <div className="flex items-center w-36 h-12.5 rounded-xl p-2.5 gap-2.5 bg-[#D40215] opacity-100">
                    <div className="w-4.5 h-4.5 rounded-full bg-white opacity-100 shrink-0"></div>
                    <span className="w-24 h-7.5 font-poppins font-semibold text-[20px] leading-none tracking-normal uppercase text-white flex items-center justify-center opacity-100 whitespace-nowrap">
                      Live now
                    </span>
                  </div>
                  <h1 className="font-poppins font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white whitespace-pre-line leading-tight">
                    {slide.title}
                  </h1>
                  <p className="font-poppins font-normal text-base md:text-lg xl:text-2xl text-white opacity-90">
                    {slide.subtitle}
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap xl:items-center w-full max-w-5xl gap-4 md:gap-6 xl:gap-10">
                  <div className="md:border-r border-white/30 md:pr-6 xl:pr-10 flex flex-col gap-1 md:gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6 text-white" />
                      <span className="font-poppins font-normal text-base md:text-lg xl:text-xl text-white">
                        Ends In
                      </span>
                    </div>
                    <div className="flex items-start justify-between w-48 xl:w-60">
                      <div className="flex flex-col items-center">
                        <span className="font-poppins font-semibold text-2xl md:text-3xl xl:text-4xl text-white">02</span>
                        <span className="font-poppins font-medium text-[10px] md:text-xs xl:text-sm uppercase text-white opacity-90">HRS</span>
                      </div>
                      <span className="font-poppins font-semibold text-2xl md:text-3xl xl:text-4xl text-white">:</span>
                      <div className="flex flex-col items-center">
                        <span className="font-poppins font-semibold text-2xl md:text-3xl xl:text-4xl text-white">34</span>
                        <span className="font-poppins font-medium text-[10px] md:text-xs xl:text-sm uppercase text-white opacity-90">MIN</span>
                      </div>
                      <span className="font-poppins font-semibold text-2xl md:text-3xl xl:text-4xl text-white">:</span>
                      <div className="flex flex-col items-center">
                        <span className="font-poppins font-semibold text-2xl md:text-3xl xl:text-4xl text-white">18</span>
                        <span className="font-poppins font-medium text-[10px] md:text-xs xl:text-sm uppercase text-white opacity-90">SEC</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:border-r border-white/30 md:pr-6 xl:pr-10 flex flex-col gap-1 md:gap-2">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6 text-white" />
                      <span className="font-poppins font-normal text-base md:text-lg xl:text-xl text-white">
                        Registration Fee
                      </span>
                    </div>
                    <span className="font-poppins font-semibold text-2xl md:text-3xl xl:text-4xl text-white">{slide.fee}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6 text-white" />
                      <span className="font-poppins font-normal text-base md:text-lg xl:text-xl text-white">
                        Min. Order Value
                      </span>
                    </div>
                    <span className="font-poppins font-semibold text-2xl md:text-3xl xl:text-4xl text-white">{slide.minOrder}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-4 md:gap-6 xl:gap-8 mt-1">
                  <div className="flex items-start gap-2 md:gap-3 border-r border-white/30 pr-3 md:pr-4 xl:pr-8">
                    <IndianRupee className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#FEB305]" strokeWidth={2} />
                    <div className="flex flex-col">
                      <span className="font-poppins font-semibold text-sm md:text-lg xl:text-xl text-white leading-tight">₹ 1 Registration</span>
                      <span className="font-poppins font-normal text-xs xl:text-base text-white opacity-80 mt-0.5">One-Time Fee</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3 lg:border-r border-white/30 pr-3 md:pr-4 xl:pr-8">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#FEB305]" strokeWidth={2} />
                    <div className="flex flex-col">
                      <span className="font-poppins font-semibold text-sm md:text-lg xl:text-xl text-white leading-tight">10 Min Cart</span>
                      <span className="font-poppins font-normal text-xs xl:text-base text-white opacity-80 mt-0.5">Hurry! Limited Time</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3 border-r border-white/30 pr-3 md:pr-4 xl:pr-8">
                    <Package className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#FEB305]" strokeWidth={2} />
                    <div className="flex flex-col">
                      <span className="font-poppins font-semibold text-sm md:text-lg xl:text-xl text-white leading-tight">Min. 2 Products</span>
                      <span className="font-poppins font-normal text-xs xl:text-base text-white opacity-80 mt-0.5">OR ₹ 5k min value</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <Star className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#FEB305]" strokeWidth={2} />
                    <div className="flex flex-col">
                      <span className="font-poppins font-semibold text-sm md:text-lg xl:text-xl text-white leading-tight">Top Brands</span>
                      <span className="font-poppins font-normal text-xs xl:text-base text-white opacity-80 mt-0.5">100% Original Products</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2 xl:mt-4">
                  <button className="flex items-center justify-center w-full sm:w-64 xl:w-72 h-12 xl:h-16 rounded-lg bg-secondary font-poppins font-bold text-base md:text-lg xl:text-xl text-white hover:opacity-90 transition-opacity">
                    Register for {slide.fee}
                  </button>
                  <button className="flex items-center justify-center w-full sm:w-64 xl:w-72 h-12 xl:h-16 rounded-lg border border-white font-poppins font-bold text-base md:text-lg xl:text-xl text-white hover:bg-white/10 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider layout */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-5 z-20">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-8 h-3.5 rounded-full cursor-pointer transition-colors ${
                index === selectedIndex ? "bg-secondary" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
