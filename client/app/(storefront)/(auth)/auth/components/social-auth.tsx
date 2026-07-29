import Image from "next/image";
import { GoogleIcon, FacebookIcon, AppleIcon } from "@/assets/images";

export function SocialAuth() {
  return (
    <div className="w-full max-w-192.5 h-auto sm:h-18 py-4 sm:p-5 gap-4 sm:gap-10 bg-gray-50 border border-black/25 rounded-lg flex flex-col sm:flex-row items-center justify-center">
      <span className="w-auto sm:w-41 h-auto sm:h-7.5 font-['Poppins'] font-normal text-base sm:text-[20px] leading-none text-black flex items-center justify-center text-center">
        Or continue with
      </span> 
      <div className="w-auto sm:w-44 h-8 flex items-center gap-6 sm:gap-10">
        {/* Social Icons */}
        <div className="relative w-8 h-8 shrink-0 hover:opacity-80 transition-opacity cursor-pointer">
          <Image src={GoogleIcon} alt="Google" fill className="object-contain" />
        </div>
        <div className="relative w-8 h-8 shrink-0 hover:opacity-80 transition-opacity cursor-pointer">
          <Image src={FacebookIcon} alt="Facebook" fill className="object-contain" />
        </div>
        <div className="relative w-8 h-8 shrink-0 hover:opacity-80 transition-opacity cursor-pointer">
          <Image src={AppleIcon} alt="Apple" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
