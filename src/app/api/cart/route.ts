import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/components/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    // This code must be removed after testing.
    const user = await prisma.user.findUnique({
      where: { email: "alice@prisma.io" },
      include: {
        cart: true,
      }
    });

    const token = user?.cart?.token ?? req.cookies.get("cartToken")?.value;

    if (!token) return NextResponse.json({ cartItem: [], totalAmount: 0 })

    const userCart = await prisma.cart.findFirst({
      where: {
        token
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

    return NextResponse.json({ cartItem: userCart?.cartItem, totalAmount: userCart?.totalAmount })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Failed to fetch cart", details: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // This code must be removed after testing.
    const user = await prisma.user.findUnique({
      where: { email: "alice@prisma.io" },
      include: {
        cart: true,
      }
    });

    const data = (await req.json()) as CreateCartItemValues
    const token = req.cookies.get("cartToken")?.value;
    const userCart = user?.cart ?? await findOrCreateCart(token);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients,
            }
          },
        }
      },
      include: {
        ingredients: true,
      }
    })

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id
        },
        data: {
          quantity: findCartItem.quantity + 1
        }
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
          productItemId: data.productItemId,
        }
      })
    }

    const updateUserCart = await updateCartTotalAmount(userCart.token);
    const response = NextResponse.json(updateUserCart)

    response.cookies.set("cartToken", userCart.token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return response;
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: "Unable to create a shopping cart" },
      { status: 500 }
    )
  }
}