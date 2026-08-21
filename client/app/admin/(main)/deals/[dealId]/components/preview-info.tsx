

export function PreviewInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[8px] font-bold uppercase text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-extrabold text-gray-800">
        {value}
      </p>
    </div>
  );
}
