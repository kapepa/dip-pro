import { CartItemDTO } from "@/components/shared/services/dto/cart.dto";
import { CartItemType } from "@/components/shared/types/cart-item-type";

export const calcCartItemTotalPrice = (item: CartItemDTO | CartItemType): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price, 0
  );

  return ingredientsPrice;
};