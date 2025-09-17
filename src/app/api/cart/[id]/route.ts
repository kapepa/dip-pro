import prisma from "@/lib/prisma";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // This code must be removed after testing.
    const user = await prisma.user.findUnique({
      where: { email: "alice@prisma.io" },
      include: {
        cart: true,
      }
    });

    const { id } = await params;
    const data = (await req.json()) as { quantity: number };
    const token = user?.cart?.token ?? req.cookies.get("cartToken")?.value;

    if (!token) return NextResponse.json({ message: "Cart not found" }, { status: 500 })

    const cartItem = await prisma.cartItem.findFirst({
      where: { id }
    })

    if (!cartItem) return NextResponse.json({ error: "Can't item not found" });

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity }
    })

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Unable to update shopping cart" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // This code must be removed after testing.
    const user = await prisma.user.findUnique({
      where: { email: "alice@prisma.io" },
      include: {
        cart: true,
      }
    });

    const { id } = await params;
    const token = user?.cart?.token ?? req.cookies.get("cartToken")?.value;

    if (!token) return NextResponse.json({ message: "Cart not found" }, { status: 500 })

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    })

    if (!cartItem) return NextResponse.json({ error: "Can't item not found" });

    await prisma.cartItem.delete({
      where: {
        id
      }
    })

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Unable to delete shopping cart" }, { status: 500 })
  }
}