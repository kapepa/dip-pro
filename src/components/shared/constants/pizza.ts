export const mapPizzaSize = {
  20: "Small",
  30: "Middle",
  40: "Large",
} as const;

export const mapPizzaType = {
  1: "Traditional",
  2: "Thin",
} as const;

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;

export type PizzaNames = (typeof mapPizzaSize)[keyof typeof mapPizzaSize];
export type PizzaThickness = (typeof mapPizzaSize)[keyof typeof mapPizzaSize];

export const pizzaSize = Object
  .entries(mapPizzaSize)
  .map(([value, name]) => ({ value: Number(value) as PizzaSize, name }));

export const pizzaTypes = Object
  .entries(mapPizzaType)
  .map(([value, name]) => ({ value: Number(value) as PizzaType, name }));

export type VariantPizzaSize = {
  name: string;
  value: PizzaSize;
  disabled?: boolean;
};

export type VariantPizzaType = {
  name: string;
  value: PizzaType;
  disabled?: boolean;
};