"use client";

import { useState, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface DealImageCarouselProps {
  images: (string | StaticImageData)[];
  title: string;
}

export function DealImageCarousel({ images, title }: DealImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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
    <div className="bg-primary aspect-4/3 rounded-4xl group relative flex items-center justify-center overflow-hidden lg:col-span-1 xl:col-span-5">
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((img, index) => (
            <div className="relative h-full flex-[0_0_100%]" key={index}>
              <Image
                src={img}
                alt={`${title} - image ${index + 1}`}
                className="h-full w-full object-cover opacity-90"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay elements */}
      <div className="pointer-events-none absolute left-6 top-6 z-10">
        <span className="bg-primary rounded-lg px-3 py-1.5 text-xs font-bold tracking-wider text-white">
          UPCOMING
        </span>
        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white drop-shadow-md">
          <Calendar size={16} /> Starts on 15 May 2025, 12:00 PM
        </div>
      </div>

      {/* Carousel Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition hover:bg-white group-hover:opacity-100"
      >
        <ChevronLeft size={20} className="text-black" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition hover:bg-white group-hover:opacity-100"
      >
        <ChevronRight size={20} className="text-black" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
