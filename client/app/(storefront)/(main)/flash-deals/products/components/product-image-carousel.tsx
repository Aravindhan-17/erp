"use client";

import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: (StaticImageData | string)[];
  title: string;
}

export function ProductImageCarousel({ images, title }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, // Deal slider isn't looped typically, but we can keep loop false so disabled state works
  });

  const [active, setActive] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActive(emblaApi.selectedScrollSnap());
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
    <div className="flex flex-col-reverse gap-4 md:grid md:grid-cols-[80px_1fr]">
      {/* thumbnails */}
      <div className="flex flex-row gap-3 overflow-x-auto md:flex-col">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`
              relative
              h-20
              w-20
              shrink-0
              overflow-hidden
              rounded-xl
              border
              ${active === index ? "border-primary" : "border-gray-200"}
            `}
          >
            <Image src={img} alt={title} fill className="object-contain p-2" />
          </button>
        ))}
      </div>

      {/* main image */}
      <div className="group relative flex h-87.5 items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-white md:h-130">
        {/* Embla Viewport */}
        <div className="h-full w-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {images.map((img, index) => (
              <div key={index} className="relative h-full min-w-0 flex-[0_0_100%]">
                <Image
                  src={img}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="absolute left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white opacity-0 shadow-md transition hover:scale-105 hover:bg-gray-50 disabled:cursor-auto disabled:opacity-0 group-hover:opacity-100 md:flex"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="absolute right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white opacity-0 shadow-md transition hover:scale-105 hover:bg-gray-50 disabled:cursor-auto disabled:opacity-0 group-hover:opacity-100 md:flex"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
