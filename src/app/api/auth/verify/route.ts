import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) return NextResponse.json({ error: "Неправильний код" }, { status: 400 });

    const verificationCode = await prisma.verificationCode.findFirst({
      where: { code }
    })

    if (!verificationCode) return NextResponse.json({ error: "Неправильний код" }, { status: 400 });

    await prisma.user.update({
      where: {
        id: verificationCode.userId
      },
      data: {
        verified: true
      }
    })

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id
      }
    })

    return NextResponse.redirect(new URL("/?verified", req.url))
  } catch (err) {
    console.log(err)
  }
}