import Image from "next/image";
import {
  RegisterBg,
  DealBag,
  GiftBox,
  GiftBox2,
  Cart,
  FileLayout,
  LockLayout,
} from "@/assets/images";

export function AuthBackground({
  variant = "register",
}: {
  variant?: "login" | "register" | "forgot";
}) {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image src={RegisterBg} alt="Background" fill sizes="100vw" priority className="object-cover" />
      </div>

      {variant === "register" && (
        <>
          {/* Decorative Box 1 (Gift Box) - Register */}
          <div className="absolute left-10 top-16 2xl:left-52 2xl:top-14 z-0 hidden w-40 h-44 lg:w-48 lg:h-52 2xl:w-62.5 2xl:h-[275px] rotate-[-15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block">
            <Image src={GiftBox} alt="Gift Box" fill sizes="(max-width: 1536px) 200px, 250px" priority className="object-contain" />
          </div>

          {/* Decorative Bag 1 (Deals Bag) - Register */}
          <div className="absolute right-10 bottom-10 2xl:right-32 2xl:bottom-32 z-0 hidden w-40 h-44 lg:w-48 lg:h-52 2xl:w-62.5 2xl:h-[261px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block">
            <Image src={DealBag} alt="Deals Bag" fill sizes="(max-width: 1536px) 200px, 250px" priority className="object-contain" />
          </div>
        </>
      )}

      {variant === "login" && (
        <>
          {/* Decorative Box 2 (Gift Box 2) - Login */}
          <div className="absolute right-10 top-20 2xl:right-32 2xl:top-32 z-0 hidden w-32 h-32 lg:w-40 lg:h-40 2xl:w-50 2xl:h-49.25 rotate-[-15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block">
            <Image src={GiftBox2} alt="Gift Box 2" fill sizes="(max-width: 1536px) 160px, 200px" priority className="object-contain" />
          </div>

          {/* Decorative Cart (Cart) - Login */}
          <div className="absolute left-10 bottom-20 2xl:left-36 2xl:bottom-[15%] z-0 hidden w-48 h-56 lg:w-64 lg:h-72 2xl:w-[350px] 2xl:h-[404px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block">
            <Image src={Cart} alt="Cart" fill sizes="(max-width: 1536px) 256px, 350px" priority className="object-contain" />
          </div>
        </>
      )}

      {variant === "forgot" && (
        <>
          {/* Decorative File (FileLayout) - Forgot Password */}
          <div className="absolute left-10 top-32 2xl:left-72 2xl:top-72 z-0 hidden w-40 h-40 lg:w-48 lg:h-48 2xl:w-62.5 2xl:h-62.5 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block">
            <Image src={FileLayout} alt="File Layout" fill sizes="(max-width: 1536px) 200px, 250px" priority className="object-contain" />
          </div>

          {/* Decorative Lock (LockLayout) - Forgot Password */}
          <div className="absolute right-10 bottom-32 2xl:right-32 2xl:bottom-[20%] z-0 hidden w-40 h-40 lg:w-48 lg:h-48 2xl:w-62.5 2xl:h-62.5 rotate-[15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block">
            <Image src={LockLayout} alt="Lock Layout" fill sizes="(max-width: 1536px) 200px, 250px" priority className="object-contain" />
          </div>
        </>
      )}
    </>
  );
}
