import { cn } from "@/lib/utils";
import { FC } from "react";

interface PizzaImageProps {
  src: string,
  name: string,
  size: 20 | 30 | 40,
  className?: string,
}

const PizzaImage: FC<PizzaImageProps> = (props) => {
  const { src, size, name, className } = props;

  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className
      )}
    >
      <img
        src={src}
        alt={name}
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300 object-contain",
          {
            "w-[300px] h-[300px]": size === 20,
            "w-[400px] h-[400px]": size === 30,
            "w-[500px] h-[500px]": size === 40,
          }
        )}
      />
      <div className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200",
        {
          "w-[280px] h-[280px] xs:w-[350px] xs:h-[350px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px]": size === 20,
          "w-[350px] h-[350px] xs:w-[400px] xs:h-[400px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px]": size === 30,
          "w-[400px] h-[400px] xs:w-[450px] xs:h-[450px] sm:w-[500px] sm:h-[500px] md:w-[550px] md:h-[550px] lg:w-[600px] lg:h-[600px]": size === 40,
        }
      )} />
      <div className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100",
        {
          "w-[220px] h-[220px] xs:w-[280px] xs:h-[280px] sm:w-[320px] sm:h-[320px]": size === 20,
          "w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[370px] sm:h-[370px] md:w-[420px] md:h-[420px]": size === 30,
          "w-[320px] h-[320px] xs:w-[370px] xs:h-[370px] sm:w-[420px] sm:h-[420px] md:w-[470px] md:h-[470px] lg:w-[520px] lg:h-[520px]": size === 40,
        }
      )} />
    </div>
  )
}

export { PizzaImage }