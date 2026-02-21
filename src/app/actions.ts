'use server'

import { CheckoutFormType } from "@/components/shared/checkout/schemas/checkout-schema";
import { FormProfileValues, FormRegisterValues } from "@/components/shared/modals/auth/forms/schemas";
import { getUserSession } from "@/lib/get-user-session";
import prisma from "@/lib/prisma";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
// import { sendEmail } from "@/lib/send-email";
// import { PayOrder } from "@/components/shared/email-template/pay-order";
// import { VerificationUser } from "@/components/shared/email-template/verification-user";
import { Prisma } from "@prisma/client";

type UserWithCart = Prisma.UserGetPayload<{
  include: { cart: true }
}>;

export async function createOrder(data: CheckoutFormType) {
  try {
    let token: string;
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (cartToken) {
      token = cartToken;
    } else {
      const { email, phone } = data

      const existUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }]
        },
        include: {
          cart: true,
        }
      }) as UserWithCart | null;

      if (!existUser) throw new Error("User not found");
      if (!existUser.cart) throw new Error("User cart not found");

      token = existUser.cart.token;
    }

    if (!token) throw new Error("Cart token not found");

    const userCart = await prisma.cart.findFirst({
      where: {
        token
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
    });

    if (!userCart) throw new Error("Cart not found");
    if (userCart.totalAmount === 0) throw new Error("Cart is empty");

    // const newOrder = 
    await prisma.order.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        token,
        items: JSON.stringify(userCart.cartItem),
        status: "PENDING", // Додаємо статус
      }
    });

    await prisma.cart.update({
      where: {
        token: cartToken,
      },
      data: {
        totalAmount: 0
      }
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    });

    // await sendEmail({
    //   email: process.env.TEST_EMAIL_RESEND!,
    //   subject: "Підтвердження замовлення",
    //   component: PayOrder,
    //   props: {
    //     id: newOrder.id,
    //     totalAmount: newOrder.totalAmount
    //   }
    // });

  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateUserInfo(data: FormProfileValues) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser?.email) throw new Error("User not found");

    const profile = await prisma.user.findFirst({
      where: {
        email: currentUser.email
      }
    });

    if (!profile) throw new Error("Profile not found");

    await prisma.user.update({
      where: {
        id: profile.id
      },
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password ? hashSync(data.password, 12) : profile.password,
      }
    });

  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function registerUser(data: FormRegisterValues) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { phone: data.phone }
        ]
      }
    });

    if (existingUser) {
      if (!existingUser.verified) throw new Error("Пошта не підтверджена");
      throw new Error("Користувач вже існує");
    }

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        password: hashSync(data.password, 12),
        phone: data.phone,
        verified: true,
        role: "USER",
      }
    });

    await prisma.cart.create({
      data: {
        userId: newUser.id,
        token: crypto.randomUUID(),
        totalAmount: 0,
      }
    });

    // const code = Math.floor(100000 + Math.random() * 90000).toString();
    // await prisma.verificationCode.create({
    //   data: {
    //     code,
    //     userId: newUser.id
    //   }
    // });

    // await sendEmail({
    //   email: process.env.TEST_EMAIL_RESEND!,
    //   subject: "Підтвердження реєстрації",
    //   component: VerificationUser,
    //   props: { code }
    // });

  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteUser(id: string) {
  try {
    // Видаляємо пов'язані записи в транзакції
    await prisma.$transaction([
      prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId: id
          }
        }
      }),
      prisma.cart.deleteMany({
        where: {
          userId: id
        }
      }),
      prisma.verificationCode.deleteMany({
        where: {
          userId: id
        }
      }),
      prisma.order.deleteMany({
        where: {
          userId: id
        }
      }),
      prisma.user.delete({
        where: { id }
      })
    ]);
  } catch (err) {
    console.log(err);
    throw err;
  }
}