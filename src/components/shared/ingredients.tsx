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
        "bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar",
        className,
      )}
    >
      <div
        className="grid grid-cols-3 gap-3"
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
                    "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white border",
                    { "border-primary": active }
                  )
                }
              >
                {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
                <img
                  src={ing.imageUrl}
                  alt={ing.name}
                  width={100}
                  height={100}
                />
                <span
                  className="text-xs mt-2"
                >
                  {ing.name}
                </span>
                <span
                  className="font-bold"
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