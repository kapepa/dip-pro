"use client"

import { useRouter } from "next/navigation";
import { FC, useMemo } from "react";
import { useCartStore } from "./store/cart";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { toast } from "sonner";
import { ProductType } from "./types/product-type";

interface ChooseBaseProps {
  product: ProductType,
}

const ChooseBase: FC<ChooseBaseProps> = (props) => {
  const { product } = props;
  const router = useRouter();
  const productItem = product.productItem[0];
  const isPizzaForm = !!productItem.pizzaType;
  const { loading, addCartItem } = useCartStore();

  const onSubmit = async (id: string, ingredientsId: string[] = []) => {
    try {
      await addCartItem({
        productItemId: id,
        ingredients: ingredientsId.length ? ingredientsId : [],
      })

      router.back();
      toast.success(`The ${product.name} has been successfully added to your cart.`);
    } catch (err) {
      console.error(err)
      toast.error("An error occurred while adding to the cart")
    }
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