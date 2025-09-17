import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../../constants/pizza';


export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
    size: PizzaSize;
    pizzaType: PizzaType;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  cartItem: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: string;
  ingredients?: string[];
}