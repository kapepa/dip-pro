"use client"

import { FC, useMemo } from "react";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { ProductType } from "./types/product-type";
import { useCart } from "./hooks/use-cart";
import { useRouter } from "next/navigation";

interface ChooseBaseProps {
  product: ProductType,
}

const ChooseBase: FC<ChooseBaseProps> = (props) => {
  const { product } = props;
  const router = useRouter();
  const productItem = product.productItem[0];
  const isPizzaForm = !!productItem.pizzaType;
  const { loading, addItemToCart } = useCart();

  const onSubmit = async (id: string, ingredientsId: string[] = []) => {
    await addItemToCart(id, ingredientsId, product.name)
    router.back();
  }

  const handlerProduct = useMemo(() => {
    if (isPizzaForm) return (
      <ChoosePizzaForm
        loading={loading}
        product={product}
        onSubmit={onSubmit}
      />
    )
    return (
      <ChooseProductForm
        price={productItem.price}
        loading={loading}
        product={product}
        onSubmit={onSubmit}
      />
    )
  }, [loading, product, isPizzaForm])

  return (handlerProduct)
}

export { ChooseBase }