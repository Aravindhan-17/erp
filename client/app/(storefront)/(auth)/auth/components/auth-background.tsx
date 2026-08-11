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
        <Image
          src={RegisterBg}
          alt="Background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {variant === "register" && (
        <>
          {/* Decorative Box 1 (Gift Box) - Register */}
          <div className="2xl:w-62.5 2xl:h-68.75 absolute left-10 top-16 z-0 hidden h-44 w-40 rotate-[-15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block lg:h-52 lg:w-48 2xl:left-52 2xl:top-14">
            <Image
              src={GiftBox}
              alt="Gift Box"
              fill
              sizes="(max-width: 1536px) 200px, 250px"
              priority
              className="object-contain"
            />
          </div>

          {/* Decorative Bag 1 (Deals Bag) - Register */}
          <div className="2xl:w-62.5 2xl:h-65.25 absolute bottom-10 right-10 z-0 hidden h-44 w-40 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block lg:h-52 lg:w-48 2xl:bottom-32 2xl:right-32">
            <Image
              src={DealBag}
              alt="Deals Bag"
              fill
              sizes="(max-width: 1536px) 200px, 250px"
              priority
              className="object-contain"
            />
          </div>
        </>
      )}

      {variant === "login" && (
        <>
          {/* Decorative Box 2 (Gift Box 2) - Login */}
          <div className="2xl:w-50 2xl:h-49.25 absolute right-10 top-20 z-0 hidden h-32 w-32 rotate-[-15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block lg:h-40 lg:w-40 2xl:right-32 2xl:top-32">
            <Image
              src={GiftBox2}
              alt="Gift Box 2"
              fill
              sizes="(max-width: 1536px) 160px, 200px"
              priority
              className="object-contain"
            />
          </div>

          {/* Decorative Cart (Cart) - Login */}
          <div className="2xl:h-101 2xl:w-87.5 absolute bottom-20 left-10 z-0 hidden h-56 w-48 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block lg:h-72 lg:w-64 2xl:bottom-[15%] 2xl:left-36">
            <Image
              src={Cart}
              alt="Cart"
              fill
              sizes="(max-width: 1536px) 256px, 350px"
              priority
              className="object-contain"
            />
          </div>
        </>
      )}

      {variant === "forgot" && (
        <>
          {/* Decorative File (FileLayout) - Forgot Password */}
          <div className="2xl:w-62.5 2xl:h-62.5 absolute left-10 top-32 z-0 hidden h-40 w-40 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block lg:h-48 lg:w-48 2xl:left-72 2xl:top-72">
            <Image
              src={FileLayout}
              alt="File Layout"
              fill
              sizes="(max-width: 1536px) 200px, 250px"
              priority
              className="object-contain"
            />
          </div>

          {/* Decorative Lock (LockLayout) - Forgot Password */}
          <div className="2xl:w-62.5 2xl:h-62.5 rotate-15 absolute bottom-32 right-10 z-0 hidden h-40 w-40 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] lg:block lg:h-48 lg:w-48 2xl:bottom-[20%] 2xl:right-32">
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
      )}
    </>
  );
}
