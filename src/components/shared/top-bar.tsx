import { cn } from "@/lib/utils";
import { FC } from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Container } from "./container";
import { Category } from "@prisma/client";

interface TopBarProps {
  className?: string
  categories: Category[]
}

const TopBar: FC<TopBarProps> = (props) => {
  const { categories, className } = props;

  return (
    <div
      className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}
    >
      <Container>
        <Categories
          categories={categories}
        />
        <SortPopup />
      </Container>
    </div>
  )
}

export { TopBar }