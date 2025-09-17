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
      className={cn("inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer", className)}
    >
      <ArrowUpDown
        size={16}
      />
      <b>
        Sort:
      </b>
      <b
        className="text-primary"
      >
        Popular
      </b>
    </div>
  )
}

export { SortPopup }