"use client"

import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { ProductType } from "./types/product-type";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { mapPizzaType, PizzaSize, PizzaType } from "./constants/pizza";
import { Ingredients } from "./ingredients";
import { useChoosePizza } from "./hooks/use-choose-pizza";

interface ChoosePizzaFormProps {
  loading: boolean,
  product: ProductType,
  className?: string
  onSubmit?: (productItemId: string, ingredientsId: string[]) => void,
}

const ChoosePizzaForm: FC<ChoosePizzaFormProps> = (props) => {
  const { loading, product: { name, imageUrl, ingredients, productItem }, className, onSubmit } = props;
  const { size, type, totalPrice, currentItemId, availablePizzaTypes, availablePizzaSizes, selectedIngredients, setSize, setType, setSelectedIngredients } = useChoosePizza({ productItem })

  const textDetaills = `${size} cm, ${mapPizzaType[type]} pizza`;

  const handlerClick = () => {
    onSubmit!(currentItemId!, selectedIngredients.map(ingredient => ingredient.id))
  }

  return (
    <div
      className={
        cn("flex flex-1", className)
      }
    >
      <div className="flex items-center justify-center flex-1 relative w-full">
        <PizzaImage
          src={imageUrl}
          name={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
          size={size}
        />
      </div>
      <div
        className="w-[490px] bg-[#f7f6f5] p-7"
      >
        <Title
          size="md"
          className="font-extrabold mb-1"
        >
          {name}
        </Title>

        <p
          className="text-gray-400"
        >
          {textDetaills}
        </p>

        <div
          className="flex flex-col gap-4 mt-5"
        >
          <GroupVariants<PizzaSize>
            value={size}
            items={availablePizzaSizes}
            onClickAction={setSize}
          />

          <GroupVariants<PizzaType>
            value={type}
            items={availablePizzaTypes}
            onClickAction={setType}
          />
        </div>

        <Ingredients
          ingredients={ingredients}
          className="mt-10"
          onClickAction={setSelectedIngredients}
        />

        <Button
          onClick={handlerClick}
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart {totalPrice} $
        </Button>
      </div>
    </div>
  )
}

export { ChoosePizzaForm }