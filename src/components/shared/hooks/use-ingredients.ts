"use client"

import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAll } from "../services/ingredients";

export function useIngredients(): { loading: boolean, ingredients: Ingredient[] } {
  const [loading, setLoading] = useState<boolean>(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const ingredients = await getAll();
        setIngredients(ingredients)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    })()
  }, [])

  return { loading, ingredients }
}