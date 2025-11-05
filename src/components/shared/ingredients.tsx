"use client"

import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";
import { CircleCheck } from "lucide-react";
import { useSet } from 'react-use';
import { FC, useCallback } from "react";

interface IngredientsProps {
  className?: string,
  ingredients: Ingredient[],
  onClickAction: (ing: Ingredient[]) => void,
}

const Ingredients: FC<IngredientsProps> = (props) => {
  const { className, ingredients, onClickAction } = props;
  const [selectedIds, { toggle, has }] = useSet<string>(new Set([]));

  const handlerIngredientClick = useCallback((ing: Ingredient) => {
    toggle(ing.id);

    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(ing.id)) {
      newSelectedIds.delete(ing.id);
    } else {
      newSelectedIds.add(ing.id);
    }

    const selectedIngredients = ingredients.filter(ingredient =>
      newSelectedIds.has(ingredient.id)
    );

    onClickAction(selectedIngredients);
  }, [selectedIds, ingredients, toggle, onClickAction]);

  return (
    <div
      className={cn(
        "bg-gray-50 rounded-md overflow-auto scrollbar",
        "p-3 xs:p-4 sm:p-5",
        "h-[300px] xs:h-[350px] sm:h-[400px] md:h-[420px]",
        className,
      )}
    >
      <div
        className={cn(
          "grid gap-2 xs:gap-3 sm:gap-3",
          "grid-cols-2",
          "xs:grid-cols-2",
          "sm:grid-cols-3",
          "md:grid-cols-3"
        )}
      >
        {
          ingredients.map((ing, index) => {
            const active = has(ing.id)
            return (
              <div
                key={`${ing.id}-${index}`}
                onClick={handlerIngredientClick.bind(null, ing)}
                className={
                  cn(
                    "flex items-center flex-col p-1 rounded-md text-center relative cursor-pointer shadow-md bg-white border",
                    "w-full min-w-0",
                    "p-1 xs:p-2",
                    { "border-primary": active }
                  )
                }
              >
                {active && <CircleCheck className={`
                  absolute text-primary
                  top-1 right-1 xs:top-2 xs:right-2
                  w-3 h-3 xs:w-4 xs:h-4
                `} />}
                <img
                  src={ing.imageUrl}
                  alt={ing.name}
                  className={`
                    w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                    object-contain
                  `}
                />
                <span
                  className={`
                    mt-1 xs:mt-2
                    text-xs xs:text-sm
                    line-clamp-2
                    px-1
                  `}
                >
                  {ing.name}
                </span>
                <span
                  className={`
                    font-bold
                    text-xs xs:text-sm
                    mt-1
                  `}
                >
                  {ing.price} $
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export { Ingredients }