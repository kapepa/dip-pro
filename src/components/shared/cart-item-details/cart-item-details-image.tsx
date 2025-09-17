import { cn } from "@/lib/utils";

interface Props {
  src: string;
  className?: string;
  alt?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({
  src,
  className,
  alt = "Product image"
}) => {
  return <img className={cn('w-[60px] h-[60px]', className)} src={src} alt={alt} />;
};