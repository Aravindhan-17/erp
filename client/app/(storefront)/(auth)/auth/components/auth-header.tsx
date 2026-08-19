export function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="max-w-192.5 min-h-17.75 mx-auto flex w-full flex-col items-center justify-center gap-2 text-center sm:gap-0">
      <h2 className="max-w-85.5 h-auto w-full font-['Poppins'] text-2xl font-bold leading-tight text-black sm:h-12 sm:text-[32px] sm:leading-none">
        {title}
      </h2>
      <p className="max-w-152.5 sm:h-6.75 h-auto w-full font-['Poppins'] text-sm font-medium leading-tight text-black/50 sm:text-[18px] sm:leading-none">
        {subtitle}
      </p>
    </div>
  );
}
