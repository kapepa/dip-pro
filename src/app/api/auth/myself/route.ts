import { getUserSession } from "@/lib/get-user-session"
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const profile = await getUserSession();
    if (!profile) return NextResponse.json({ message: "Not authorized" }, { status: 401 })

    const data = await prisma.user.findFirst({
      where: {
        OR: [{ id: String(profile.id) }, { email: profile.email! }]
      },
      select: {
        fullName: true,
        email: true,
        phone: true,
        password: false,
      }
    })

    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Server error /api/myself GET" }, { status: 500 })
  }
}