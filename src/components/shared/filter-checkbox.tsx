"use client"

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC, ReactNode, useState } from "react";
import { Checkbox } from "../ui/checkbox";

export interface FilterCheckboxProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  text: string
  value: string
  isSelected?: boolean
  endAdornment?: ReactNode
}

const FilterCheckbox: FC<FilterCheckboxProps> = (props) => {
  const { text, disabled, isSelected, endAdornment, ...checkboxProps } = props
  const [isChecked, setChecked] = useState<boolean>(Boolean(isSelected))

  const toggle = () => {
    if (disabled) return;
    const newValue = !isChecked
    setChecked(newValue)
    checkboxProps.onCheckedChange?.(newValue)
  }

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={toggle}
    >
      <Checkbox
        id={`checkbox-${text}`}
        disabled={disabled}
        className={cn(checkboxProps.className)}
        checked={isChecked}
      />

      <label
        htmlFor={`checkbox-${text}`}
        className="leading-none whitespace-nowrap"
      >
        {text}
      </label>

      {endAdornment}
    </div>
  )
}

export { FilterCheckbox }