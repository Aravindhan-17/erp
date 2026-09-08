import {  useNavigate  } from "@tanstack/react-router";

import { Clock, IndianRupee, Package, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { BannerImg1, BannerImg2, BannerImg3 } from "@/assets/images";
import { products } from "@/features/flash-deals/products/lib/product-data";

const SLIDES = [
  {
    title: "Summer Electronics\nFlash Sale",
    subtitle: "Unbeatable deals on top electronics",
    bgImage: BannerImg1,
    fee: "₹ 1",
    minOrder: "₹ 5,000",
    productId: products[0].id,
  },
  {
    title: "Premium Gadgets\nClearance",
    subtitle: "Huge discounts on laptops and more",
    bgImage: BannerImg2,
    fee: "Free",
    minOrder: "₹ 2,000",
    productId: products[1].id,
  },
  {
    title: "Smart Home\nFestival",
    subtitle: "Transform your home with smart tech",
    bgImage: BannerImg3,
    fee: "₹ 50",
    minOrder: "₹ 10,000",
    productId: products[2].id,
  },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const navigate = useNavigate();

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

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

  const handleRegisterClick = (productId: number) => {
    navigate({ to: `/flash-deals/register/${productId}` });
  };

  return (
    <section className="relative mx-auto w-full max-w-[1920px] px-4 md:px-8 xl:px-10">
      <div
        className="relative mx-auto h-full w-full max-w-[1840px] overflow-hidden rounded-3xl"
        ref={emblaRef}
      >
        <div className="flex h-full w-full touch-pan-y">
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className="min-h-150 relative flex h-full min-w-0 flex-[0_0_100%] flex-col justify-center overflow-hidden p-8 xl:min-h-full xl:p-20"
            >
              <div className="pointer-events-none absolute inset-0 z-0">
                <img
                  src={slide.bgImage}
                  alt={slide.title.replace("\n", " ")}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="bg-linear-to-b absolute inset-0 from-transparent from-[15.38%] to-black/50 to-[81.11%]" />
              </div>
              <div className="relative z-10 flex w-full max-w-7xl flex-col gap-6 pb-10 md:gap-8 xl:gap-10">
                <div className="flex w-full max-w-2xl flex-col gap-3 md:gap-4 xl:gap-5">
                  <div className="h-12.5 flex w-36 items-center gap-2.5 rounded-xl bg-[#D40215] p-2.5 opacity-100">
                    <div className="w-4.5 h-4.5 shrink-0 rounded-full bg-white opacity-100"></div>
                    <span className="h-7.5 font-poppins flex w-24 items-center justify-center whitespace-nowrap text-[20px] font-semibold uppercase leading-none tracking-normal text-white opacity-100">
                      Live now
                    </span>
                  </div>
                  <h1 className="font-poppins whitespace-pre-line text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="font-poppins text-base font-normal text-white opacity-90 md:text-lg xl:text-2xl">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="flex w-full max-w-5xl flex-col gap-4 md:flex-row md:flex-wrap md:gap-6 xl:flex-nowrap xl:items-center xl:gap-10">
                  <div className="flex flex-col gap-1 border-white/30 md:gap-2 md:border-r md:pr-6 xl:pr-10">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-white md:h-5 md:w-5 xl:h-6 xl:w-6" />
                      <span className="font-poppins text-base font-normal text-white md:text-lg xl:text-xl">
                        Ends In
                      </span>
                    </div>
                    <div className="flex w-48 items-start justify-between xl:w-60">
                      <div className="flex flex-col items-center">
                        <span className="font-poppins text-2xl font-semibold text-white md:text-3xl xl:text-4xl">
                          02
                        </span>
                        <span className="font-poppins text-[10px] font-medium uppercase text-white opacity-90 md:text-xs xl:text-sm">
                          HRS
                        </span>
                      </div>
                      <span className="font-poppins text-2xl font-semibold text-white md:text-3xl xl:text-4xl">
                        :
                      </span>
                      <div className="flex flex-col items-center">
                        <span className="font-poppins text-2xl font-semibold text-white md:text-3xl xl:text-4xl">
                          34
                        </span>
                        <span className="font-poppins text-[10px] font-medium uppercase text-white opacity-90 md:text-xs xl:text-sm">
                          MIN
                        </span>
                      </div>
                      <span className="font-poppins text-2xl font-semibold text-white md:text-3xl xl:text-4xl">
                        :
                      </span>
                      <div className="flex flex-col items-center">
                        <span className="font-poppins text-2xl font-semibold text-white md:text-3xl xl:text-4xl">
                          18
                        </span>
                        <span className="font-poppins text-[10px] font-medium uppercase text-white opacity-90 md:text-xs xl:text-sm">
                          SEC
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 border-white/30 md:gap-2 md:border-r md:pr-6 xl:pr-10">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-white md:h-5 md:w-5 xl:h-6 xl:w-6" />
                      <span className="font-poppins text-base font-normal text-white md:text-lg xl:text-xl">
                        Registration Fee
                      </span>
                    </div>
                    <span className="font-poppins text-2xl font-semibold text-white md:text-3xl xl:text-4xl">
                      {slide.fee}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-white md:h-5 md:w-5 xl:h-6 xl:w-6" />
                      <span className="font-poppins text-base font-normal text-white md:text-lg xl:text-xl">
                        Min. Order Value
                      </span>
                    </div>
                    <span className="font-poppins text-2xl font-semibold text-white md:text-3xl xl:text-4xl">
                      {slide.minOrder}
                    </span>
                  </div>
                </div>

                <div className="mt-1 grid w-full grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 xl:gap-8">
                  <div className="flex items-start gap-2 border-r border-white/30 pr-3 md:gap-3 md:pr-4 xl:pr-8">
                    <IndianRupee
                      className="h-5 w-5 text-[#FEB305] md:h-6 md:w-6 xl:h-8 xl:w-8"
                      strokeWidth={2}
                    />
                    <div className="flex flex-col">
                      <span className="font-poppins text-sm font-semibold leading-tight text-white md:text-lg xl:text-xl">
                        ₹ 1 Registration
                      </span>
                      <span className="font-poppins mt-0.5 text-xs font-normal text-white opacity-80 xl:text-base">
                        One-Time Fee
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-white/30 pr-3 md:gap-3 md:pr-4 lg:border-r xl:pr-8">
                    <Clock
                      className="h-5 w-5 text-[#FEB305] md:h-6 md:w-6 xl:h-8 xl:w-8"
                      strokeWidth={2}
                    />
                    <div className="flex flex-col">
                      <span className="font-poppins text-sm font-semibold leading-tight text-white md:text-lg xl:text-xl">
                        10 Min Cart
                      </span>
                      <span className="font-poppins mt-0.5 text-xs font-normal text-white opacity-80 xl:text-base">
                        Hurry! Limited Time
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-r border-white/30 pr-3 md:gap-3 md:pr-4 xl:pr-8">
                    <Package
                      className="h-5 w-5 text-[#FEB305] md:h-6 md:w-6 xl:h-8 xl:w-8"
                      strokeWidth={2}
                    />
                    <div className="flex flex-col">
                      <span className="font-poppins text-sm font-semibold leading-tight text-white md:text-lg xl:text-xl">
                        Min. 2 Products
                      </span>
                      <span className="font-poppins mt-0.5 text-xs font-normal text-white opacity-80 xl:text-base">
                        OR ₹ 5k min value
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <Star
                      className="h-5 w-5 text-[#FEB305] md:h-6 md:w-6 xl:h-8 xl:w-8"
                      strokeWidth={2}
                    />
                    <div className="flex flex-col">
                      <span className="font-poppins text-sm font-semibold leading-tight text-white md:text-lg xl:text-xl">
                        Top Brands
                      </span>
                      <span className="font-poppins mt-0.5 text-xs font-normal text-white opacity-80 xl:text-base">
                        100% Original Products
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row md:gap-4 xl:mt-4">
                  <button
                    onClick={() => handleRegisterClick(slide.productId)}
                    className="bg-secondary font-poppins flex h-12 w-full items-center justify-center rounded-lg text-base font-bold text-white transition-opacity hover:opacity-90 sm:w-64 md:text-lg xl:h-16 xl:w-72 xl:text-xl"
                  >
                    Register for {slide.fee}
                  </button>
                  <button className="font-poppins flex h-12 w-full items-center justify-center rounded-lg border border-white text-base font-bold text-white transition-colors hover:bg-white/10 sm:w-64 md:text-lg xl:h-16 xl:w-72 xl:text-xl">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider layout */}
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-5">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3.5 w-8 cursor-pointer rounded-full transition-colors ${
                index === selectedIndex ? "bg-secondary" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
