import { cn } from "@/lib/utils";
import { FC } from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Container } from "./container";
import { Category } from "@prisma/client";
import { FilterMobileSlider } from "./filter-mobile-slider";

interface TopBarProps {
  max: number,
  className?: string
  categories: Category[]
}

const TopBar: FC<TopBarProps> = (props) => {
  const { max, categories, className } = props;

  return (
    <div
      id="top-bar"
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className,
      )}
    >
      <Container
        className="flex items-center flex-wrap gap-3 justify-center lg:justify-normal"
      >
        <Categories
          categories={categories}
        />
        <SortPopup
          className="ml-5"
        />
      </Container>
      <FilterMobileSlider
        max={max}
        className="absolute top-[100%] block md:hidden"
      />
    </div>
  )
}

export { TopBar }