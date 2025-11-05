"use client"

import { FC, ReactNode, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import Image from "next/image";
import { Title } from "./title";
import { useCart } from "./hooks/use-cart";
import { Currency } from "./currency";

interface CartDrawerProps {
  className?: string,
  children?: ReactNode,
}

const CartDrawer: FC<CartDrawerProps> = (props) => {
  const { children, className } = props;
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const { cartItems, totalAmount, deleteCartItem, handlerCountButton } = useCart();

  return (
    <Sheet>
      <SheetTrigger
        asChild
      >
        {children}
      </SheetTrigger>
      <SheetContent
        className={cn("flex flex-col justify-between pb-0 bg-[#F4F1EE]", className)}
      >
        <div
          className={cn(
            "flex flex-col h-full",
            { "justify-center": !totalAmount }
          )}
        >
          {!totalAmount &&
            <SheetHeader>
              <SheetTitle>
                <div
                  className="flex flex-col items-center justify-center w-72 mx-auto"
                >
                  <Image
                    src="/assets/images/empty-box.png"
                    alt="Empty cart"
                    width={120}
                    height={120}
                  />
                  <Title
                    size="sm"
                    className="text-center font-bold my-2"
                  >
                    Ваш кошик порожній
                  </Title>
                  <p
                    className="text-center text-neutral-500 mb-5"
                  >
                    Додайте будь-які продукти
                  </p>

                  <SheetClose
                    asChild
                  >
                    <Button
                      size="lg"
                      className="w-56 h-12 text-base"
                    >
                      <ArrowLeft
                        className="w-5 mr-2"
                      />
                      Повертайся
                    </Button>
                  </SheetClose>
                </div>
              </SheetTitle>
            </SheetHeader>
          }
          {totalAmount > 0 &&
            <>
              <SheetHeader>
                <SheetTitle>
                  У вашому кошику <span className="font-bold">{cartItems.length}</span> товари.
                </SheetTitle>
              </SheetHeader>

              <div
                className="overflow-y-auto flex-1"
              >

                {
                  cartItems.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="mb-2"
                    >
                      <CartDrawerItem
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={getCartItemDetails(item.ingredients, item.pizzaType, item.pizzaSize)}
                        name={item.name}
                        disabled={item.disabled}
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={(action) => handlerCountButton(action, item.id, item.quantity)}
                        onClickDelete={() => deleteCartItem(item.id)}
                      />
                    </div>
                  ))
                }

              </div>

              <SheetFooter className=" bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Всього
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">
                      <Currency>
                        {totalAmount}
                      </Currency>
                    </span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={redirecting}
                      type="submit"
                      className="w-full h-12 text-base">
                      Оформити замовлення
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { CartDrawer }