import React from 'react';

import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickDelete?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickDelete,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex bg-white gap-3 xs:gap-4 sm:gap-5 md:gap-6 p-3 xs:p-4 sm:p-5',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <CartItem.Image
        src={imageUrl}
        className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-24 md:h-24"
      />

      <div className="flex-1 min-w-0">
        <CartItem.Info
          name={name}
          details={details}
          className="text-sm xs:text-base"
        />

        <hr className="my-2 xs:my-3 sm:my-3" />

        <div className="flex items-center justify-between flex-wrap gap-2 xs:gap-0">
          <CountButton
            onClick={onClickCountButton}
            value={quantity}
            size="sm"
            className="text-xs xs:text-sm"
          />

          <div className="flex items-center gap-2 xs:gap-3">
            <CartItem.Price
              value={price}
              className="text-sm xs:text-base"
            />
            <Trash2Icon
              onClick={onClickDelete}
              className="text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0 w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4"
              size={14}
            />
          </div>
        </div>
      </div>
    </div>
  );
};