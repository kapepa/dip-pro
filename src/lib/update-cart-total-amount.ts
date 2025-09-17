import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";
import prisma from "./prisma";

export async function updateCartTotalAmount(token: string) {
  const cart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: "desc"
        },
        include: {
          productItem: {
            include: {
              product: true
            }
          },
          ingredients: true
        }
      }
    }
  })

  if (!cart) return 0;

  const totalAmount = cart?.cartItem.reduce((acc, item) => {
    return acc + (item.productItem.price * item.quantity + calcCartItemTotalPrice(item))
  }, 0);

  return await prisma.cart.update({
    where: {
      id: cart.id
    },
    data: {
      totalAmount,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: "desc"
        },
        include: {
          productItem: {
            include: {
              product: true,
            }
          },
          ingredients: true,
        }
      }
    }
  })
}