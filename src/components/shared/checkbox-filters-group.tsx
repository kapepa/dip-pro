"use client"

import { ChangeEvent, FC, useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type Item = FilterCheckboxProps

interface CheckboxFiltersGroupProps {
  loading: boolean,
  title: string,
  name: string,
  items: Item[],
  limit?: number,
  selected?: Set<string>
  onChange?: (values: string) => void
  className?: string,
  defaultValue?: string[],
  defaultItems?: Item[],
  searchInputPlaceholder?: string,
}

const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = (props) => {
  const { loading, title, items, limit = 5, onChange, className, searchInputPlaceholder = "Пошук... " } = props;
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const listItems = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue))
    : items.slice(0, limit);

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase())
  }

  if (loading) {
    return (
      <div className={className}>
        <p className={cn(
          "font-bold mb-3 xs:mb-4",
          "text-base xs:text-lg"
        )}>
          {title}
        </p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                "mb-3 xs:mb-4 rounded-[8px]",
                "h-5 xs:h-6"
              )}
            />
          ))}

        <Skeleton className={cn(
          "mb-3 xs:mb-4 rounded-[8px]",
          "w-24 xs:w-28 h-5 xs:h-6"
        )} />
      </div>
    );
  }

  return (
    <div
      className={className}
    >
      <p
        className={cn(
          "font-bold mb-3 xs:mb-4",
          "text-base xs:text-lg"
        )}
      >
        {title}
      </p>

      {showAll && (
        <div
          className="mb-4 xs:mb-5"
        >
          <Input
            placeholder={searchInputPlaceholder}
            className={cn(
              "bg-gray-50 border-none",
              "h-8 xs:h-9 sm:h-10",
              "text-sm xs:text-base",
              "placeholder:text-xs xs:placeholder:text-sm"
            )}
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-3 xs:gap-4 max-h-80 xs:max-h-96 pr-2 overflow-auto scrollbar",
          "text-sm xs:text-base"
        )}
      >
        {
          listItems.map((item, index) => (
            <FilterCheckbox
              key={`${item.text}-${index}`}
              endAdornment={item.endAdornment}
              onCheckedChange={() => onChange?.(item.value)}
              {...item}
            />
          ))
        }
      </div>

      {
        items.length > limit && (
          <div
            className={cn(
              showAll ? "border-t border-t-neutral-100 mt-3 xs:mt-4" : '',
              "pt-2 xs:pt-3"
            )}
          >
            <button
              className={cn(
                "text-primary mt-2 xs:mt-3",
                "text-sm xs:text-base"
              )}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Сховати" : "+ Показати все"}
            </button>
          </div>
        )
      }

    </div>
  )
}

export { CheckboxFiltersGroup }