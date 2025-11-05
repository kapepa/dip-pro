import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { ProductType } from "./types/product-type";
import { Currency } from "./currency";

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
        cn(
          "flex flex-col lg:flex-row flex-1",
          className
        )
      }
    >
      <div className="flex items-center justify-center relative w-full lg:w-1/2 p-4 xs:p-5 sm:p-6 lg:p-0">
        <img
          src={imageUrl}
          alt={name}
          className={`
            relative transition-all z-10 duration-300
            w-[300px] h-[300px]
            sm:w-[320px] sm:h-[320px]
            md:w-[350px] md:h-[350px]
            lg:w-[400px] lg:h-[400px]
            xl:w-[450px] xl:h-[450px]
            max-w-full
          `}
        />
      </div>

      <div
        className={`
          bg-[#f7f6f5] p-4 xs:p-5 sm:p-6 lg:p-7
          w-full lg:w-1/2
          flex flex-col justify-center
          z-10
        `}
      >
        <Title
          size="md"
          className={`
            font-extrabold mb-1
            text-center lg:text-left
            text-xl xs:text-2xl sm:text-3xl
          `}
        >
          {name}
        </Title>

        <Button
          loading={loading}
          onClick={onSubmit.bind(null, productItem[0].id)}
          className={`
            h-12 xs:h-14 sm:h-[55px]
            text-sm xs:text-base
            rounded-[14px] xs:rounded-[16px] sm:rounded-[18px]
            w-full
            mt-6 xs:mt-8 sm:mt-10
            px-6 xs:px-8 sm:px-10
          `}
        >
          Додати до кошик <Currency>{price}</Currency>
        </Button>
      </div>
    </div>
  )
}

export { ChooseProductForm }