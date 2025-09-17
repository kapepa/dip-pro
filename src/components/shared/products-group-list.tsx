"use client"

import { cn } from "@/lib/utils";
import { FC, RefObject, useEffect, useRef } from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useIntersection } from 'react-use';
import { useCategoriesStore } from "./store/categories";
import { Ingredient, Product, ProductItem } from "@prisma/client";

type ProductsType = Product & { productItem: ProductItem[], ingredients: Ingredient[] }

interface ProductsGroupListProps {
  title: string,
  products: ProductsType[],
  className?: string,
  categoryId: string,
  listClassName?: string,
}

const ProductsGroupList: FC<ProductsGroupListProps> = (props) => {
  const { title, products, categoryId, className, listClassName } = props;
  const { setActiveId } = useCategoriesStore();
  const intersectionRef = useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(
    intersectionRef as RefObject<HTMLElement>,
    { threshold: 0.7 }
  );

  useEffect(() => {
    if (intersection && intersection?.isIntersecting) {
      setActiveId(categoryId)
    }
  }, [intersection, categoryId, setActiveId])

  return (
    <div
      id={title}
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
        className={cn("grid grid-cols-3 gap-[50px]", listClassName)}
      >
        {
          products.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.productItem[0].price}
              ingredients={product.ingredients}
            />
          ))
        }
      </div>
    </div>
  )
}

export { ProductsGroupList }