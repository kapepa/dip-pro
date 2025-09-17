"use client"

import { cn } from "@/lib/utils";
import { FC } from "react";
import { useCategoriesStore } from "./store/categories";
import { Category } from "@prisma/client";

interface CategoriesProps {
  categories: Category[]
  className?: string
}

const Categories: FC<CategoriesProps> = (props) => {
  const { categories, className } = props;
  const { activeId } = useCategoriesStore();

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {
        categories.map(({ id, name }, index) => (
          <a
            key={`${name}-${index}`}
            href={`/#${name}`}
            className={cn(
              "flex items-center font-bold h-11 rounded-2xl px-5",
              activeId === id && "bg-white shadow-md shadow-gray-200 text-primary")}
          >
            <button
              className="cursor-pointer"
            >
              {name}
            </button>
          </a>
        ))
      }
    </div>
  )
}

export { Categories }