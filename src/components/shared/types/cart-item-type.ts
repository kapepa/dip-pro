import { CartItem, Ingredient, ProductItem } from "@prisma/client";

export type CartItemType = CartItem & { productItem: ProductItem, ingredients: Ingredient[] }