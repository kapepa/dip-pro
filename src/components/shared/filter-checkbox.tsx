"use client"

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { Checkbox } from "../ui/checkbox";

export interface FilterCheckboxProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  text: string,
  value: string,
  endAdornment?: ReactNode,
}

const FilterCheckbox: FC<FilterCheckboxProps> = (props) => {
  const { text, endAdornment, ...checkboxProps } = props;

  return (
    <div
      className="flex items-center space-x-2"
    >
      <Checkbox
        id={`checkbox-${text}`}
        className={cn("", checkboxProps.className)}
        {...checkboxProps}
      />
      <label
        htmlFor={`checkbox-${text}`}
        className="leading-none cursor-pointer flex-1 whitespace-nowrap"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  )
}

export { FilterCheckbox }