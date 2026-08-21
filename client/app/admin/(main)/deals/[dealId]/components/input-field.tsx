import React from 'react';
import { CalendarDays } from "lucide-react";

export function InputField({
  label,
  placeholder,
  value,
  onChange,
  defaultValue,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            h-9
            w-full
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3
            text-xs
            text-gray-700
            outline-none
            transition
            placeholder:text-gray-400
            focus:border-violet-400
            focus:ring-2
            focus:ring-violet-100
          "
        />

        {type === "datetime-local" && (
          <CalendarDays
            size={14}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />
        )}
      </div>
    </div>
  );
}
