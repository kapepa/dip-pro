// types/next-auth.d.ts
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: UserRole;
    fullName: string,
    image: string,
    email?: string;
    // Add any other custom properties you get from GitHub
  }

  interface Session {
    user: {
      [x: string]: string;
      fullName: string;
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role: UserRole,
  }
}