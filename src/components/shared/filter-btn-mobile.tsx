import { FC } from "react";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBtnMobileProps {
  className?: string,
  onClick: () => void,
}

const FilterBtnMobile: FC<FilterBtnMobileProps> = (props) => {
  const { onClick, className } = props;

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={
        cn(
          "cursor-pointer w-16 h-16 rounded-full flex justify-center items-center border-2 border-secondary",
          className
        )
      }
    >
      <Filter
        className="text-primary size-10"
      />
    </Button>
  )
}

export { FilterBtnMobile }