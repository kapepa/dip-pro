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
      className={cn("mx-auto max-w-[1280px]", className)}
    >
      {children}
    </div>
  )
}

export { Container }