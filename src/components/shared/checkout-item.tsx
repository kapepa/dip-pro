'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        `
        flex flex-col gap-4
        md:flex-row md:items-center md:justify-between
        `,
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <div className="flex items-center gap-4 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <div className="text-left md:text-center md:w-[80px]">
        <CartItemDetails.Price value={price} />
      </div>

      <div className="flex items-center gap-4 md:gap-5 md:justify-end">
        <CartItemDetails.CountButton
          onClick={onClickCountButton}
          value={quantity}
        />

        <button
          type="button"
          onClick={onClickRemove}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export const CheckoutItemSkeleton = () => (
  <div
    className="
      flex flex-col gap-4
      sm:flex-row sm:items-center sm:justify-between
    "
  >
    <div className="flex items-center gap-4">
      <Skeleton className="w-[50px] h-[50px]" />
      <Skeleton className="w-40 h-5" />
    </div>

    <Skeleton className="h-5 w-12" />

    <Skeleton className="h-8 w-full sm:w-[130px]" />
  </div>
);