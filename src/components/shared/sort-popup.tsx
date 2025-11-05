import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { FC } from "react";

interface SortPopupProps {
  className?: string,
}

const SortPopup: FC<SortPopupProps> = (props) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-gray-50 rounded-2xl cursor-pointer flex-shrink-0",
        "h-9 xs:h-10 sm:h-11 md:h-[52px]",
        "px-3 xs:px-4 sm:px-5",
        "py-2 xs:py-2.5 sm:py-3",
        className
      )}
    >
      <ArrowUpDown
        className={cn(
          "h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
        )}
      />
      <b className={cn(
        "text-xs xs:text-sm sm:text-base"
      )}>
        Сортувати:
      </b>
      <b
        className={cn(
          "text-primary text-xs xs:text-sm sm:text-base"
        )}
      >
        Популярні
      </b>
    </div>
  )
}

export { SortPopup }