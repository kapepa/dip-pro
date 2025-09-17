import { Category } from "@prisma/client";
import { ProductType } from "./product-type";

export type CategoriesTypes = Category & { products: ProductType[] }