import { cn } from "@/lib/utils";
import { createElement, FC, ReactNode } from "react";

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface TitleProps {
  size?: TitleSize,
  children?: ReactNode,
  className?: string,
}

const Title: FC<TitleProps> = (props) => {
  const { size = "sm", children, className } = props;

  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const;

  const mapClassNameBySize = {
    xs: 'text-[16px]',
    sm: 'text-[22px]',
    md: 'text-[26px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
    '2xl': 'text-[48px]',
  } as const;

  return createElement(mapTagBySize[size], { className: cn(mapClassNameBySize[size], className) }, children)
}

export { Title }