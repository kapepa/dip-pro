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

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    const topBar = document.getElementById("top-bar")
    const targetElement = document.getElementById(id);
    if (targetElement && topBar) {
      const barHeight = topBar.offsetHeight;
      const elementPosition = targetElement.offsetTop - barHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-1 bg-gray-50 p-1 rounded-2xl overflow-x-auto",
        className
      )}
    >
      {
        categories.map(({ id, name }, index) => (
          <a
            key={`${name}-${index}`}
            href={`/#${id}`}
            onClick={(e) => handleCategoryClick(e, id)}
            className={cn(
              "flex items-center justify-center font-bold rounded-2xl flex-shrink-1 grow",
              "h-8 xs:h-9 sm:h-10 md:h-11",
              "px-3 xs:px-4 sm:px-5",
              "text-xs xs:text-sm sm:text-base",
              activeId === id && "bg-white shadow-md shadow-gray-200 text-primary"
            )}
          >
            <button
              className="cursor-pointer whitespace-nowrap"
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