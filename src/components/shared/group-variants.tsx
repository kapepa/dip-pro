"use client"

import { cn } from "@/lib/utils";

interface GroupVariantsProps<T extends string | number> {
  value: T;
  items: Array<{
    value: T;
    name: string;
    disabled?: boolean;
  }>;
  onClickAction: (value: T) => void;
  className?: string;
}

export const GroupVariants = <T extends string | number>({
  value,
  items,
  onClickAction,
  className,
}: GroupVariantsProps<T>) => {
  return (
    <div className={cn("flex gap-2 mt-4", className)}>
      {items.map((item) => (
        <button
          key={String(item.value)}
          onClick={() => onClickAction(item.value)}
          disabled={item.disabled}
          className={
            cn(
              "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-300 text-sm",
              {
                "bg-white shadow": item.value === value,
                "text-gray-500 opacity-50 pointer-events-none": item.disabled,
              }
            )
          }
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};