import { GoogleIcon, FacebookIcon, AppleIcon } from "@/assets/images";

export function SocialAuth() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-black/25 bg-gray-50 p-4 sm:flex-row sm:gap-6">
      <span className="text-center font-['Poppins'] text-sm font-medium text-black sm:text-base">
        Or continue with
      </span>
      <div className="flex items-center gap-6">
        {/* Social Icons */}
        <div className="relative h-6 w-6 shrink-0 cursor-pointer transition-opacity hover:opacity-80 sm:h-7 sm:w-7">
          <img src={GoogleIcon} alt="Google" sizes="28px" className="object-contain" />
        </div>
        <div className="relative h-6 w-6 shrink-0 cursor-pointer transition-opacity hover:opacity-80 sm:h-7 sm:w-7">
          <img src={FacebookIcon} alt="Facebook" sizes="28px" className="object-contain" />
        </div>
        <div className="relative h-6 w-6 shrink-0 cursor-pointer transition-opacity hover:opacity-80 sm:h-7 sm:w-7">
          <img src={AppleIcon} alt="Apple" sizes="28px" className="object-contain" />
        </div>
      </div>
    </div>
  );
}
