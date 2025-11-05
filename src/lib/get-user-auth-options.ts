import { hashSync } from "bcrypt"
import prisma from "./prisma"

const getUserAuthOptions = async (props: { email: string, name: string, id: string }) => {
  const { id, name, email } = props;
  const hasUser = await prisma.user.findUnique({
    where: { email }
  })

  if (hasUser) return hasUser

  return await prisma.user.create({
    data: {
      email,
      fullName: name || id,
      password: hashSync(id.toString(), 12),
      verified: true,
    }
  })
}

export { getUserAuthOptions }