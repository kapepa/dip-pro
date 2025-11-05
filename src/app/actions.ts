'use server'

import { CheckoutFormType } from "@/components/shared/checkout/schemas/checkout-schema";
import { PayOrder } from "@/components/shared/email-template/pay-order";
import { VerificationUser } from "@/components/shared/email-template/verification-user";
import { FormProfileValues, FormRegisterValues } from "@/components/shared/modals/auth/forms/schemas";
import { getUserSession } from "@/lib/get-user-session";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { User } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";


export async function createOrder(data: CheckoutFormType) {
  try {
    // This code must be removed after testing.
    const user = await prisma.user.findUnique({
      where: { email: "alice@prisma.io" },
      include: {
        cart: true,
      }
    });
    const token = user!.cart!.token

    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) throw new Error("Cart token not found");

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        cartItem: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              }
            }
          }
        }
      }
    })

    if (!userCart) throw new Error("Cart not found");
    if (userCart.totalAmount === 0) throw new Error("Cart is empty");

    const newOrder = await prisma.order.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        token: cartToken,
        items: JSON.stringify(userCart.cartItem)
      }
    })

    await prisma.cart.update({
      where: {
        token: cartToken,
      },
      data: {
        totalAmount: 0
      }
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    })

    await sendEmail({
      email: process.env.TEST_EMAIL_RESEND!,
      subject: "Підтвердження замовлення",
      component: PayOrder,
      props: {
        id: newOrder.id,
        totalAmount: newOrder.totalAmount
      }
    })

  } catch (err) {
    console.log(err)
  }
}

export async function updateUserInfo(data: FormProfileValues) {
  try {
    const currentUser = await getUserSession();
    if (!(currentUser && currentUser!.email)) throw new Error("User not found");

    const profile = await prisma.user.findFirst({
      where: {
        email: currentUser.email
      }
    })

    await prisma.user.update({
      where: {
        id: profile?.id
      },
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password ? hashSync(data.password, 12) : profile?.password,
      }
    })

  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function registerUser(data: FormRegisterValues) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      }
    })

    if (!!user) {
      if (!user.verified) throw new Error("Пошта не підтверджена")
      throw new Error("Користувач вже існує")
    }

    const createUser = await prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        password: hashSync(data.password, 12)
      }
    });

    const code = Math.floor(100000 + Math.random() * 90000).toString();
    await prisma.verificationCode.create({
      data: {
        code,
        userId: createUser.id
      }
    })

    await sendEmail({
      email: process.env.TEST_EMAIL_RESEND!,
      subject: "Підтвердження реєстрації",
      component: VerificationUser,
      props: { code }
    })

  } catch (err) {
    console.log(err)
    throw err
  }
}