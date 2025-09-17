"use client"

import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients } from "./hooks/use-ingredients";
import { useFilters } from "./hooks/use-filters";
import { useQueryFilters } from "./hooks/use-query-filters";

interface FiltersProps {
  className?: string
}

const Filters: FC<FiltersProps> = (props) => {
  const { className } = props;
  const { ingredients, loading } = useIngredients();
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
        className="mb-5 font-bold"
      >
        Filters
      </Title>

      <div
        className="flex flex-col gap-4"
      >
        <CheckboxFiltersGroup
          title="Тип теста"
          name="pizzaTypes"
          className="mb-5"
          onChange={filters.setPizzaTypes}
          selected={filters.pizzaTypes}
          loading={loading}
          items={[
            { text: 'Thin', value: '1' },
            { text: 'Traditional', value: '2' },
          ]}
        />
        <CheckboxFiltersGroup
          title="Size"
          name="sizes"
          className="mb-5"
          onChange={filters.setSizes}
          selected={filters.sizes}
          loading={loading}
          items={[
            { text: '20 cm', value: '20' },
            { text: '30 cm', value: '30' },
            { text: '40 cm', value: '40' },
          ]}
        />
      </div>

      <div
        className="mt-5 border-y border-y-neutral-100 py-6 pb-7"
      >
        <p
          className="font-bold mb-3"
        >
          Price from and to:
        </p>
        <div
          className="flex gap-3 mb-5 w-full"
        >
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            // defaultValue={0}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[0, 5000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ingredients"
        name="ingredients"
        className="mt-5"
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