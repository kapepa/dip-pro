import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface ContainerProps {
  className?: string,
  children?: ReactNode
}

const Container: FC<ContainerProps> = (props) => {
  const { children, className } = props;

  return (
    <div
      className={cn(
        "mx-auto w-full",
        "px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12",
        "max-w-[320px] xs:max-w-[375px] sm:max-w-[425px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1440px]",
        className
      )}
    >
      {children}
    </div>
  )
}

export { Container }