import { cn } from "@/lib/utils";
import { Currency } from "../currency";

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>
    <Currency>
      {value}
    </Currency>
  </h2>;
};