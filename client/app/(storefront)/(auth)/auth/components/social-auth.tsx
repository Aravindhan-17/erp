import Image from "next/image";
import { GoogleIcon, FacebookIcon, AppleIcon } from "@/assets/images";

export function SocialAuth() {
  return (
    <div className="max-w-192.5 sm:h-18 flex h-auto w-full flex-col items-center justify-center gap-4 rounded-lg border border-black/25 bg-gray-50 py-4 sm:flex-row sm:gap-10 sm:p-5">
      <span className="sm:w-41 sm:h-7.5 flex h-auto w-auto items-center justify-center text-center font-['Poppins'] text-base font-normal leading-none text-black sm:text-[20px]">
        Or continue with
      </span>
      <div className="flex h-8 w-auto items-center gap-6 sm:w-44 sm:gap-10">
        {/* Social Icons */}
        <div className="relative h-8 w-8 shrink-0 cursor-pointer transition-opacity hover:opacity-80">
          <Image src={GoogleIcon} alt="Google" fill className="object-contain" />
        </div>
        <div className="relative h-8 w-8 shrink-0 cursor-pointer transition-opacity hover:opacity-80">
          <Image src={FacebookIcon} alt="Facebook" fill className="object-contain" />
        </div>
        <div className="relative h-8 w-8 shrink-0 cursor-pointer transition-opacity hover:opacity-80">
          <Image src={AppleIcon} alt="Apple" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
