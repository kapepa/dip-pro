import { getServerSession } from "next-auth"
import { authOptions } from "./auth-options";

const getUserSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

export { getUserSession }