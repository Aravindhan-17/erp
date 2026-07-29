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
        <Image src={RegisterBg} alt="Background" fill priority className="object-cover" />
      </div>

      {variant === "register" && (
        <>
          {/* Decorative Box 1 (Gift Box) - Register */}
          <div className="absolute left-[214px] top-[59px] z-0 hidden h-[275px] w-[250px] rotate-[-15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] xl:block">
            <Image src={GiftBox} alt="Gift Box" fill priority className="object-contain" />
          </div>

          {/* Decorative Bag 1 (Deals Bag) - Register */}
          <div className="absolute left-[1425px] top-[733px] z-0 hidden h-[261px] w-[250px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] xl:block">
            <Image src={DealBag} alt="Deals Bag" fill priority className="object-contain" />
          </div>
        </>
      )}

      {variant === "login" && (
        <>
          {/* Decorative Box 2 (Gift Box 2) - Login */}
          <div className="absolute left-[1403px] top-[129px] z-0 hidden h-[197px] w-[200px] rotate-[-15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] xl:block">
            <Image src={GiftBox2} alt="Gift Box 2" fill priority className="object-contain" />
          </div>

          {/* Decorative Cart (Cart) - Login */}
          <div className="absolute left-[145px] top-[525px] z-0 hidden h-[404px] w-[350px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] xl:block">
            <Image src={Cart} alt="Cart" fill priority className="object-contain" />
          </div>
        </>
      )}

      {variant === "forgot" && (
        <>
          {/* Decorative File (FileLayout) - Forgot Password */}
          <div className="absolute left-[285px] top-[300px] z-0 hidden h-[250px] w-[250px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] xl:block">
            <Image src={FileLayout} alt="File Layout" fill priority className="object-contain" />
          </div>

          {/* Decorative Lock (LockLayout) - Forgot Password */}
          <div className="absolute left-[1367px] top-[503px] z-0 hidden h-[250px] w-[250px] rotate-[15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] xl:block">
            <Image src={LockLayout} alt="Lock Layout" fill priority className="object-contain" />
          </div>
        </>
      )}
    </>
  );
}
