import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

type CreateUserRequest = Pick<User, "email" | "fullName" | "password">

export async function POST(req: NextRequest) {
  try {
    const body: CreateUserRequest = await req.json(); // how describe type script ! what i reques type?
    const { email, fullName, password } = body;

    if (!email || !fullName || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existEmail = await prisma.user.findFirst({ where: { email } })

    if (!!existEmail) {
      return NextResponse.json(
        { error: "This email address is already in use." },
        { status: 403 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
      }
    });

    const { password: _, ...profile } = user;

    return NextResponse.json(profile, { status: 201 });
  } catch (err) {
    console.error("User creation error:", err);

    // Handle specific errors
    if (err instanceof Error && 'code' in err) {
      switch (err.code) {
        case 'P2002':
          return NextResponse.json(
            { error: "Email already exists" },
            { status: 409 }
          );
        default:
          return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
          );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}