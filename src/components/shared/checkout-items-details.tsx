import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FC } from "react";
import { Currency } from "./currency";
import { Skeleton } from "../ui/skeleton";

interface CheckoutItemsDetailsProps {
  loading?: boolean,
  icon?: LucideIcon,
  title?: string,
  value?: string | number,
  className?: string,
}

const CheckoutItemsDetails: FC<CheckoutItemsDetailsProps> = (props) => {
  const { icon: Icon, title, value, loading, className } = props;

  return (
    <div
      className={cn(
        `
        flex items-center justify-between
        py-1
        `,
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm sm:text-lg text-neutral-500">
        {Icon && <Icon size={18} className="text-gray-300" />}
        <span className="whitespace-nowrap">{title}</span>
        <span className="hidden sm:block flex-1 border-b border-dashed border-neutral-300 mx-3 relative top-1" />
      </div>

      {loading ? (
        <Skeleton className="h-5 sm:h-6 w-14 sm:w-16" />
      ) : (
        <span className="font-bold text-sm sm:text-lg whitespace-nowrap">
          <Currency>{value}</Currency>
        </span>
      )}
    </div>
  )
}

export { CheckoutItemsDetails }