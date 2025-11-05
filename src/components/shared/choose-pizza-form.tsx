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
import { Currency } from "./currency";

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
        cn(
          "flex flex-col lg:flex-row flex-1",
          className
        )
      }
    >

      <div
        className="flex items-center justify-center flex-1 relative w-full p-4 xs:p-5 sm:p-6 lg:p-0"
      >
        <PizzaImage
          src={imageUrl}
          name={name}
          className={`
            relative transition-all z-10 duration-300
            w-[300px] h-[350px] 
            sm:w-[320px] sm:h-[320px]
            md:w-[450px] md:h-[500px]
            lg:left-2 lg:top-2
            max-w-full
          `}
          size={size}
        />
      </div>

      <div
        className={`
          bg-[#f7f6f5] p-4 xs:p-5 sm:p-6 lg:p-7
          w-full lg:w-1/2 xl:w-[490px]
          flex flex-col justify-center
          z-10
        `}
      >
        <Title
          size="md"
          className={`
            font-extrabold mb-1
            text-center lg:text-left
            text-xl xs:text-2xl sm:text-3xl
          `}
        >
          {name}
        </Title>

        <p
          className={`
            text-gray-400
            text-center lg:text-left
            text-sm xs:text-base
            mb-4 xs:mb-5
          `}
        >
          {textDetaills}
        </p>

        <div
          className="flex flex-col gap-3 xs:gap-4 sm:gap-5"
        >
          <GroupVariants<PizzaSize>
            value={size}
            items={availablePizzaSizes}
            onClickAction={setSize}
            className="text-sm xs:text-base"
          />

          <GroupVariants<PizzaType>
            value={type}
            items={availablePizzaTypes}
            onClickAction={setType}
            className="text-sm xs:text-base"
          />
        </div>

        <Ingredients
          ingredients={ingredients}
          className="mt-6 xs:mt-8 sm:mt-10"
          onClickAction={setSelectedIngredients}
        />

        <Button
          onClick={handlerClick}
          loading={loading}
          className={`
            h-12 xs:h-14 sm:h-[55px]
            text-sm xs:text-base
            rounded-[14px] xs:rounded-[16px] sm:rounded-[18px]
            w-full
            mt-6 xs:mt-8 sm:mt-10
            px-6 xs:px-8 sm:px-10
          `}
        >
          Додати до візку <Currency>{totalPrice}</Currency>
        </Button>
      </div>
    </div>
  )
}

export { ChoosePizzaForm }