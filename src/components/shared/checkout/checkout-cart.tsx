import { FC } from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem, CheckoutItemSkeleton } from "../checkout-item";
import { CartStateItem } from "@/lib/get-cart-details";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { CartStateProps } from "../store/cart";

interface CheckoutCartProps {
  loading?: boolean,
  className?: string,
  cartItems: CartStateItem[];
  deleteCartItem: CartStateProps["deleteCartItem"],
  handlerCountButton: (action: 'plus' | 'minus', id: string, quantity: number) => void
}

const CheckoutCart: FC<CheckoutCartProps> = (props) => {
  const { loading, className, cartItems, deleteCartItem, handlerCountButton } = props;
  const isEmpty = !loading && cartItems.length === 0;

  return (
    <WhiteBlock title="1. Кошик" className={className}>
      <div
        className="
          flex flex-col
          gap-4
          sm:gap-5
          md:gap-6
        "
      >
        {loading && cartItems.length === 0 && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <CheckoutItemSkeleton
                key={`checkout-skeleton-${index}`}
              />
            ))}
          </>
        )}

        {!loading &&
          cartItems.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType,
                item.pizzaSize
              )}
              quantity={item.quantity}
              imageUrl={item.imageUrl}
              disabled={item.disabled}
              onClickCountButton={(type) =>
                handlerCountButton(type, item.id, item.quantity)
              }
              onClickRemove={() => deleteCartItem(item.id)}
            />
          ))}

        {isEmpty && (
          <p className="text-sm text-muted-foreground text-center py-6">
            Ваш кошик порожній
          </p>
        )}
      </div>
    </WhiteBlock>
  )
}

export { CheckoutCart }