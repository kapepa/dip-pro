"use client"

import { FC, useState } from "react";
import { FilterBtnMobile } from "./filter-btn-mobile";
import { cn } from "@/lib/utils";
import { FilterBar } from "./filter-bar";
import { XClose } from "./x-close";

interface FilterMobileSliderProps {
  className?: string
}

const FilterMobileSlider: FC<FilterMobileSliderProps> = (props) => {
  const { className } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handlerFilterMobile = () => {
    if (open) setOpen(false)
    else setOpen(true)
  }

  return (
    <div
      className={cn(
        "relative w-full",
        className
      )}
    >
      <FilterBtnMobile
        onClick={handlerFilterMobile}
        className={
          cn(
            "absolute top-3 right-6",
            open && "hidden"
          )
        }
      />
      <div
        className={cn(
          "fixed top-0 left-0 ring-0 bottom-0 w-full h-full hidden",
          open && "block"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "bg-secondary pt-4 pb-8 w-full px-3 h-0 invisible relative",
          open && "h-full visible"
        )}
      >
        <FilterBar
          className="w-full"
        />
        <XClose
          size={10}
          onClick={handlerFilterMobile}
          className="absolute top-2 right-2"
        />
      </div>
    </div>
  )
}

export { FilterMobileSlider }