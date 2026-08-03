"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type ProductType = {
  id: number;
  name: string;
  category: string;
  image: StaticImageData | string;
  originalPrice: number;
  discountPrice: number;
  discount: string;
};

interface DealProductsCarouselProps {
  products: ProductType[];
}

export function DealProductsCarousel({ products }: DealProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="group relative">
      <div className="overflow-hidden pb-4" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product) => (
             <Link
      key={product.id}
      href={`/flash-deals/products/${product.id}`}
      className="min-w-0 flex-[0_0_190px] xl:flex-[0_0_210px]"
    >
             {/* <div key={product.id} className="min-w-0 flex-[0_0_190px] xl:flex-[0_0_210px]"> */}
              <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-3 transition duration-300 hover:shadow-lg">
                <div className="relative mb-3 flex h-32 justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="h-full w-auto object-contain transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-0.5 line-clamp-1 text-[13px] font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mb-3 text-[11px] font-medium text-black/50">{product.category}</p>

                  <div className="mb-3 mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="mb-0.5 text-[10px] font-medium text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-[15px] font-extrabold leading-none text-gray-900">
                        ₹{product.discountPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="mb-0.5 text-[10px] font-bold text-red-500">
                      {product.discount}
                    </span>
                  </div>

                  <button className="bg-primary flex w-full items-center justify-center gap-2 rounded-lg py-2 text-[12px] font-semibold text-white transition hover:opacity-90">
                    <Bell size={14} /> Notify Me
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        className={`absolute -left-5 top-[80px] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white opacity-0 shadow-md transition hover:scale-105 hover:bg-gray-50 disabled:cursor-auto disabled:opacity-0 group-hover:opacity-100 xl:flex`}
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>

      <button
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        className={`absolute -right-5 top-[80px] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white opacity-0 shadow-md transition hover:scale-105 hover:bg-gray-50 disabled:cursor-auto disabled:opacity-0 group-hover:opacity-100 xl:flex`}
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>
    </div>
  );
}
