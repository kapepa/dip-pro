import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductType = Product & { ingredients: Ingredient[], productItem: ProductItem[] }
export type ProductItemType = ProductItem & { pizzaType: 1 | 2 | null | undefined }