"use client"

import { cn } from "@/lib/utils";
import { FC, RefObject, useEffect, useRef } from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useIntersection } from 'react-use';
import { useCategoriesStore } from "./store/categories";
import { Ingredient, Product, ProductItem } from "@prisma/client";
import { useCart } from "./hooks/use-cart";

type ProductsType = Product & { productItem: ProductItem[], ingredients: Ingredient[] }

interface ProductsGroupListProps {
  id: string,
  title: string,
  products: ProductsType[],
  className?: string,
  categoryId: string,
  listClassName?: string,
}

const ProductsGroupList: FC<ProductsGroupListProps> = (props) => {
  const { id, title, products, categoryId, className, listClassName } = props;
  const { addItemToCart } = useCart();
  const { setActiveId } = useCategoriesStore();
  const intersectionRef = useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(
    intersectionRef as RefObject<HTMLElement>,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.66
    }
  );

  useEffect(() => {
    if (!!intersection && intersection?.isIntersecting) {
      setActiveId(categoryId)
    }
  }, [intersection, categoryId, setActiveId])

  const handlerCart = (index: number) => {
    const { name, productItem } = products[index];
    const currentItemId = productItem[0].id

    addItemToCart(currentItemId!, [], name)
  }

  return (
    <div
      id={id}
      ref={intersectionRef}
      className={cn("", className)}
    >
      <Title
        size="lg"
        className="font-extrabold mb-5"
      >
        {title}
      </Title>
      <div
        className={cn(
          "grid grid-cols-3 gap-[50px]",
          "grid-cols-1",
          "xs:grid-cols-1",
          "sm:grid-cols-1",
          "md:grid-cols-2",
          "lg:grid-cols-2",
          "xl:grid-cols-3",
          "2xl:grid-cols-3",
          listClassName
        )}
      >
        {
          products.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              index={index}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.productItem[0].price}
              ingredients={product.ingredients}
              className="min-w-0 w-full"
              onAddToCart={handlerCart}
            />
          ))
        }
      </div>
    </div>
  )
}

export { ProductsGroupList }