import { FC } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface XCloseProps {
  size: 5 | 10 | 15 | 20 | 25 | 30,
  onClick?: () => void,
  className?: string,
}

const XClose: FC<XCloseProps> = (props) => {
  const { size = 5, onClick, className } = props;

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={className}
    >
      <X
        className={cn(
          "text-primary",
          `size-${size}`
        )}
      />
    </Button>
  )
}

export { XClose }