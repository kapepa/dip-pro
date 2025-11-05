"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, MouseEvent } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";
import { Currency } from "./currency";
import { UseCartReturn } from "./hooks/use-cart";


interface ProductCardProps {
  id: string,
  name: string,
  index: number,
  price: number,
  imageUrl: string,
  className?: string,
  ingredients?: Ingredient[],
  onAddToCart: (index: number) => void
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { id, name, index, price, imageUrl, className, ingredients, onAddToCart } = props;

  const handlerAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddToCart(index)
  }

  return (
    <div
      className={cn("h-full", className)}
    >
      <Link
        href={`/product/${id}`}
        className="flex flex-col justify-between h-full"
      >
        <div
          className="flex justify-center bg-secondary rounded-lg h-[200px] xs:h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] xl:h-[300px] p-4 xs:p-5 sm:p-6"
        >
          <img
            src={imageUrl}
            alt={name}
            className="object-contain w-full h-full max-w-[160px] max-h-[160px] xs:max-w-[180px] xs:max-h-[180px] sm:max-w-[200px] sm:max-h-[200px] md:max-w-[215px] md:max-h-[215px] lg:max-w-[230px] lg:max-h-[230px] xl:max-w-[250px] xl:max-h-[250px]"
          />
        </div>
        <div className="mt-3 xs:mt-4 sm:mt-5">
          <Title
            size="sm"
            className="mb-1 xs:mb-2 font-bold text-sm xs:text-base sm:text-lg md:text-xl line-clamp-2 min-h-[2.5em]"
          >
            {name}
          </Title>

          {!!ingredients?.length && (
            <p
              className="text-xs xs:text-sm text-gray-400 line-clamp-2 min-h-[2em]"
            >
              {ingredients?.map(ingredient => ingredient.name).join(", ")}
            </p>
          )}

          <div
            className="flex justify-between mt-3 xs:mt-4 sm:mt-5 xs:flex-row gap-2 xs:gap-0 flex-wrap"
          >
            <span
              className="text-base text-center xs:text-lg sm:text-[20px] w-full xs:w-auto xs:text-left grow basis-[45%]"
            >
              Від
              <b className="pl-2 xs:pl-3">
                <Currency>{price}</Currency>
              </b>
            </span>

            <Button
              size="sm"
              type="button"
              variant="secondary"
              onClick={handlerAddToCart}
              className="xs:w-auto text-xs xs:text-sm px-3 xs:px-4 py-2 h-auto grow basis-[150px]"
            >
              <Plus
                size={16}
                className="mr-1 xs:mr-2"
              />
              Додати
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export { ProductCard }