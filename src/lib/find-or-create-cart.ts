import prisma from "./prisma"
import crypto from "crypto"

export const findOrCreateCart = async (token?: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    }
  });

  if (!userCart) {
    return await prisma.cart.create({
      data: { token: token = crypto.randomUUID() }
    })
  }

  return userCart
}