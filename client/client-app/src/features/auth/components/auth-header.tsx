export function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-2 text-center">
      <h2 className="w-full font-['Poppins'] text-2xl font-bold text-black sm:text-3xl">{title}</h2>
      <p className="w-full font-['Poppins'] text-sm font-medium text-black/50 sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}
