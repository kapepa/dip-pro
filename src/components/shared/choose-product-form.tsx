import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { ProductType } from "./types/product-type";

interface ChooseProductFormProps {
  price: number,
  loading: boolean,
  product: ProductType,
  className?: string,
  onSubmit: (id: string) => void
}

const ChooseProductForm: FC<ChooseProductFormProps> = (props) => {
  const { price, loading, product: { name, imageUrl, productItem }, onSubmit, className } = props;

  return (
    <div
      className={
        cn("flex flex-1", className)
      }
    >
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div
        className="w-[490px] bg-[#f7f6f5] p-7"
      >
        <Title
          size="md"
          className="font-extrabold mb-1"
        >
          {name}
        </Title>
        <Button
          loading={loading}
          onClick={onSubmit.bind(null, productItem[0].id)}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart {price} $
        </Button>
      </div>
    </div>
  )
}

export { ChooseProductForm }