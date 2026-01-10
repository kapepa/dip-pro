import { FC } from "react";
import { WhiteBlock } from "./white-block";
import { cn } from "@/lib/utils";
import { CheckoutItemsDetails } from "./checkout-items-details";
import { Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { Currency } from "./currency";
import { Skeleton } from "../ui/skeleton";

interface CheckoutSidebarProps {
  loading: boolean,
  className?: string,
  totalAmount: number,
}

const VAT = 15;
const DELIVERY_PRICE = 250;

const CheckoutSidebar: FC<CheckoutSidebarProps> = (props) => {
  const { loading, className, totalAmount } = props;

  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock
      className={cn(
        `
        p-2 sm:p-3
        w-full
        md:sticky md:top-4
        `,
        className
      )}
    >

      <div className="flex flex-col gap-1 mb-4">
        <span className="text-base sm:text-xl">
          Усього:
        </span>

        {loading ? (
          <Skeleton className="h-10 w-40 sm:h-11 sm:w-48" />
        ) : (
          <span className="text-2xl sm:text-4xl font-extrabold leading-tight">
            <Currency>{totalPrice}</Currency>
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:gap-2">
        <CheckoutItemsDetails
          icon={Package}
          title="Собівартість"
          value={totalAmount}
          loading={loading}
        />
        <CheckoutItemsDetails
          icon={Percent}
          title="Податки"
          value={vatPrice}
          loading={loading}
        />
        <CheckoutItemsDetails
          icon={Truck}
          title="Доставка"
          value={DELIVERY_PRICE}
          loading={loading}
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="
          w-full
          h-12 sm:h-14
          rounded-xl sm:rounded-2xl
          mt-6
          text-sm sm:text-base
          font-bold
        "
      >
        Перейти до оплати
      </Button>
    </WhiteBlock>
  )
}

export { CheckoutSidebar }