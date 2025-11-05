"use client"

import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilters } from "./hooks/use-filters";
import { useQueryFilters } from "./hooks/use-query-filters";
import { Ingredient } from "@prisma/client";

interface FiltersProps {
  max: number,
  loading: boolean,
  className?: string,
  ingredients: Ingredient[],
}

const Filters: FC<FiltersProps> = (props) => {
  const { max, loading, className, ingredients } = props;
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: item.id, text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div
      className={cn("", className)}
    >
      <Title
        size="sm"
        className={cn(
          "font-bold mb-4 xs:mb-5",
          "text-lg xs:text-xl sm:text-2xl"
        )}
      >
        Фільтр
      </Title>

      <div
        className="flex flex-col gap-3 xs:gap-4 sm:gap-5"
      >
        <CheckboxFiltersGroup
          title="Тип теста"
          name="pizzaTypes"
          className="mb-4 xs:mb-5"
          onChange={filters.setPizzaTypes}
          selected={filters.pizzaTypes}
          loading={loading}
          items={[
            { text: 'Тонкий', value: '1' },
            { text: 'Традиційний', value: '2' },
          ]}
        />
        <CheckboxFiltersGroup
          title="Розмір"
          name="sizes"
          className="mb-4 xs:mb-5"
          onChange={filters.setSizes}
          selected={filters.sizes}
          loading={loading}
          items={[
            { text: '20 см', value: '20' },
            { text: '30 см', value: '30' },
            { text: '40 см', value: '40' },
          ]}
        />
      </div>

      <div
        className={cn(
          "mt-4 xs:mt-5 border-y border-y-neutral-100",
          "py-4 xs:py-5 sm:py-6 pb-5 xs:pb-6 sm:pb-7"
        )}
      >
        <p
          className={cn(
            "font-bold mb-3 xs:mb-4",
            "text-base xs:text-lg"
          )}
        >
          Ціна від і до:
        </p>
        <div
          className={cn(
            "flex flex-wrap gap-2 xs:gap-3 mb-4 xs:mb-5 w-full",
          )}
        >
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
            className="grow basis-20"
          />
          <Input
            type="number"
            placeholder={String(max)}
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
            className="grow basis-20"
          />
        </div>

        <RangeSlider
          min={0}
          max={max}
          step={10}
          value={[0, max]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Інгредієнти"
        name="ingredients"
        className="mt-4 xs:mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onChange={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  )
}

export { Filters }