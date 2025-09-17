"use client"

import { useEffect } from "react"
import { CartStateProps, useCartStore } from "../store/cart";

type useCartTypes = Omit<CartStateProps, "fetchCartItems" | "updateItemQuantity">

interface UseCartReturn extends useCartTypes {
  handlerCountButton: (action: 'plus' | 'minus', id: string, quantity: number) => void
}

const useCart = (): UseCartReturn => {
  const { fetchCartItems, updateItemQuantity, ...otherProps } = useCartStore();

  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  const handlerCountButton = (action: 'plus' | 'minus', id: string, quantity: number) => {
    const newQuantity = action === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  return Object.assign(otherProps, { handlerCountButton })
}

export { useCart }