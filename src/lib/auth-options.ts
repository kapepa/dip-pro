import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "./prisma";
import { getUserAuthOptions } from "./get-user-auth-options";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      async profile(profile) {
        const { id, name, email } = profile;
        const getUser = await getUserAuthOptions({ id, name, email })

        return {
          id: getUser.id,
          fullName: getUser.fullName,
          image: profile.avatar_url,
          role: getUser.role,
          email: getUser.email
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const { id, name, email } = profile;
        const getUser = await getUserAuthOptions({ id, name, email })

        return {
          id: getUser.id,
          fullName: getUser.fullName,
          image: profile.avatar_url,
          role: getUser.role,
          email: getUser.email
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } })

        if (user && credentials?.password) {
          const isCompare = await compare(credentials.password, user.password);
          if (!isCompare) return null;
          if (!user.verified) return null;

          return { id: user.id, fullName: user.fullName, role: user.role, email: user.email, image: "" }
        } else {
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        console.log(user)
        if (account?.provider === "credentials") return true;
        if (!user.email) return false;

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { id: user.id }
            ]
          }
        })

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            }
          })

          return true
        }

        return true;
      } catch (err) {
        console.error(err)
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.fullName = (user as any).fullName;
      }

      if (token.email && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true, role: true, fullName: true }
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.fullName = dbUser.fullName;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.fullName = token.fullName as string;
      }
      return session;
    }
  }
}