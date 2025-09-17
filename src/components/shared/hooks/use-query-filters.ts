"use client"

import { useEffect, useRef } from "react";
import { Filters } from "./use-filters";
import { useRouter, usePathname } from "next/navigation";
import qs from 'qs';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      }
      const query = qs.stringify(params, { arrayFormat: "comma" })

      router.push(`${pathname}?${query}`);
    }

    isMounted.current = true;
  }, [filters, router, pathname])
}