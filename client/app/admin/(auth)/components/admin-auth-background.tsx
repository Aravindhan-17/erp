import Image from "next/image";
import { RegisterBg, FileLayout, LockLayout } from "@/assets/images";

export function AdminAuthBackground() {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src={RegisterBg}
          alt="Background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {/* Decorative File (FileLayout) - Admin */}
      <div className="absolute left-10 top-32 z-0 hidden h-40 w-40 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] lg:block lg:h-48 lg:w-48 xl:left-32 xl:top-40">
        <Image
          src={FileLayout}
          alt="File Layout"
          fill
          sizes="(max-width: 1536px) 200px, 250px"
          priority
          className="object-contain"
        />
      </div>

      {/* Decorative Lock (LockLayout) - Admin */}
      <div className="rotate-15 absolute bottom-32 right-10 z-0 hidden h-40 w-40 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] lg:block lg:h-48 lg:w-48 xl:bottom-[15%] xl:right-32">
        <Image
          src={LockLayout}
          alt="Lock Layout"
          fill
          sizes="(max-width: 1536px) 200px, 250px"
          priority
          className="object-contain"
        />
      </div>
    </>
  );
}
