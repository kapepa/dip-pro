"use client"

import { FC } from "react";
import { Filters } from "./filters";
import { useIngredients } from "./hooks/use-ingredients";

import { cn } from "@/lib/utils";

interface FilterBarProps {
  max: number,
  className?: string,
}

const FilterBar: FC<FilterBarProps> = (props) => {
  const { max, className } = props;
  const { ingredients, loading } = useIngredients();

  return (
    <>
      <aside
        className={cn(className)}
      >
        <Filters
          max={max}
          loading={loading}
          ingredients={ingredients}
        />
      </aside>
    </>
  )
}

export { FilterBar }