import { Ingredient, ProductItem } from "@prisma/client"
import { pizzaSize, PizzaSize, PizzaType, pizzaTypes, VariantPizzaSize, VariantPizzaType } from "../constants/pizza";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

interface ChoosePizzaProps {
  productItem: ProductItem[]
}

interface ChoosePizzaReturn {
  size: PizzaSize,
  type: PizzaType,
  totalPrice: number,
  currentItemId: string | undefined,
  selectedIngredients: Ingredient[],
  availablePizzaTypes: VariantPizzaType[],
  availablePizzaSizes: VariantPizzaSize[],
  setSize: Dispatch<SetStateAction<PizzaSize>>,
  setType: Dispatch<SetStateAction<PizzaType>>,
  setSelectedIngredients: Dispatch<SetStateAction<Ingredient[]>>,
}

const useChoosePizza = (props: ChoosePizzaProps): ChoosePizzaReturn => {
  const { productItem } = props;
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

  const ingredientsPrice = selectedIngredients.reduce((accum, ing) => accum + ing.price, 0);
  const pizzaPrice = productItem.find(item => item.pizzaType === type && item.size === size)?.price || 0;
  const totalPrice = pizzaPrice + ingredientsPrice;
  const currentItemId = productItem.find((item) => item.pizzaType === type && item.size === size)?.id;

  const availablePizzaSizes = useMemo(() => {
    const pizza = pizzaSize.map((size) => ({
      ...size,
      disabled: !productItem.find(product => size.value === product.size && product.pizzaType === type)
    }))

    if (pizza.some(s => s.value === size && s.disabled)) setSize(pizza.find(s => !s.disabled)!.value)

    return pizza
  }, [size, type, productItem])

  const availablePizzaTypes = useMemo(() => {
    const pizza = pizzaTypes.map(type => ({
      ...type,
      disabled: !productItem.find(product => type.value === product.pizzaType)
    }))

    if (pizza.some(s => s.value === type && s.disabled)) setType(pizza.find(s => !s.disabled)!.value)

    return pizza;
  }, [type, productItem])

  return { size, type, totalPrice, currentItemId, availablePizzaTypes, availablePizzaSizes, selectedIngredients, setSize, setType, setSelectedIngredients }
}

export { useChoosePizza }