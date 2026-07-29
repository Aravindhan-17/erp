export function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="w-full max-w-192.5 mx-auto min-h-17.75 flex flex-col items-center justify-center text-center gap-2 sm:gap-0">
      <h2 className="w-full max-w-85.5 h-auto sm:h-12 font-['Poppins'] font-bold text-2xl sm:text-[32px] leading-tight sm:leading-none text-black">
        {title}
      </h2>
      <p className="w-full max-w-102.5 h-auto sm:h-6.75 font-['Poppins'] font-medium text-sm sm:text-[18px] leading-tight sm:leading-none text-black/50">
        {subtitle}
      </p>
    </div>
  );
}
