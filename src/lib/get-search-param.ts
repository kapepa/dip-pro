import prisma from "./prisma";
import { GetSearchParamProps } from "@/components/shared/interfaces/get-search-param";
import { CategoriesTypes } from "@/components/shared/types/categories-type";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

const findPizza = async (props: GetSearchParamProps): Promise<{ categories: CategoriesTypes[], max: number }> => {
  const sizes = props.sizes?.split(",").map(Number);
  const pizzaType = props.pizzaTypes?.split(",").map(Number);
  const ingredientsIds = props.ingredients?.split(",");

  const minPrice = Number(props?.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(props?.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          productItem: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              }
            },
            orderBy: {
              price: "asc"
            }
          },
          ingredients: true,
        },
        where: {
          ingredients: ingredientsIds
            ? { some: { id: { in: ingredientsIds } } }
            : undefined,
          productItem: {
            some: {
              size: {
                in: sizes
              },
              pizzaType: {
                in: pizzaType
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            }
          }
        },
      }
    }
  }).then(cat => cat.filter(c => c.products.length > 0))

  const maxPriceItem = await prisma.productItem.aggregate({
    _max: {
      price: true
    }
  });

  return { categories, max: maxPriceItem._max.price ?? 0 }
}

export { findPizza }