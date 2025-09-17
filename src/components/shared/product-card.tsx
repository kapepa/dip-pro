"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";
import { Currency } from "./currency";

interface ProductCardProps {
  id: string,
  name: string,
  price: number,
  imageUrl: string,
  className?: string,
  ingredients?: Ingredient[]
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { id, name, price, imageUrl, className, ingredients } = props;

  return (
    <div
      className={`${cn(className)} h-full`}
    >
      <Link
        href={`/product/${id}`}
        className="flex flex-col justify-between h-full"
      >
        <div
          className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]"
        >
          <img
            src={imageUrl}
            alt={name}
            className="w-[215px] h-[215px] object-cover"
          />
        </div>

        <Title
          size="sm"
          className="mb-1 mt-3 font-bold"
        >
          {name}
        </Title>

        {
          !!ingredients?.length && (
            <p
              className="text-sm text-gray-400"
            >
              {ingredients?.map(ingredient => ingredient.name).join(", ")}
            </p>
          )
        }


        <div
          className="flex justify-between items-center mt-4"
        >
          <span
            className="text-[20px]"
          >
            from
            <b className="pl-2">
              <Currency>{price}</Currency>
            </b>
          </span>

          <Button
            variant="secondary"
          >
            <Plus
              size={20}
              className="mr-1"
            />
            Add
          </Button>
        </div>
      </Link>
    </div>
  )
}

export { ProductCard }