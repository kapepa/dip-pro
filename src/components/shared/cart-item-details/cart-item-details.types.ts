import { PizzaSize, PizzaType } from "../constants/pizza";

export interface CartItemProps {
  id: string;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
  pizzaType?: PizzaType;
  pizzaSize?: PizzaSize;
}