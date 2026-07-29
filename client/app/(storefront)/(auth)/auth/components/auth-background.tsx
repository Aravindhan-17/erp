import Image from "next/image";
import { RegisterBg, DealBag, GiftBox } from "@/assets/images";

export function AuthBackground() {
  return (
    <>
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image src={RegisterBg} alt="Background" fill priority className="object-cover" />
      </div>

      {/* Decorative Box 1 (Gift Box) */}
      <div className="hidden xl:block absolute top-14.75 left-53.5 w-62.5 h-68.75 rotate-[-15deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] z-0">
        <Image src={GiftBox} alt="Gift Box" fill priority className="object-contain" />
      </div>

      {/* Decorative Bag 1 (Deals Bag) */}
      <div className="hidden xl:block absolute top-183.25 left-356.25 w-62.5 h-65.25 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] z-0">
        <Image src={DealBag} alt="Deals Bag" fill priority className="object-contain" />
      </div>
    </>
  );
}
