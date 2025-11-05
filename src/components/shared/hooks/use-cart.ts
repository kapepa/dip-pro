"use client"

import { toast } from "sonner";
import { useEffect } from "react";
import { CartStateProps, useCartStore } from "../store/cart";

type useCartTypes = Omit<CartStateProps, "fetchCartItems" | "updateItemQuantity" | "addCartItem">

export interface UseCartReturn extends useCartTypes {
  addItemToCart: (id: string, ingredientsId?: string[], name?: string) => Promise<void>;
  handlerCountButton: (action: 'plus' | 'minus', id: string, quantity: number) => void;
}

const useCart = (): UseCartReturn => {
  const { fetchCartItems, updateItemQuantity, addCartItem, ...otherProps } = useCartStore();

  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  const handlerCountButton = (action: 'plus' | 'minus', id: string, quantity: number) => {
    const newQuantity = action === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  const addItemToCart = async (id: string, ingredientsId: string[] = [], name: string = "Товар"): Promise<void> => {
    try {
      await addCartItem({
        productItemId: id,
        ingredients: ingredientsId.length ? ingredientsId : [],
      })

      toast.success(`${name} успішно додано до вашого кошика.`);
    } catch (err) {
      console.error(err)
      toast.error("Сталася помилка під час додавання до кошика")
    }
  }

  return {
    ...otherProps,
    addItemToCart,
    handlerCountButton
  }
}

export { useCart }