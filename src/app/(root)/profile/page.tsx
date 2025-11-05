import { ProfileForm } from "@/components/shared/profile-form";
import { getUserSession } from "@/lib/get-user-session";
import prisma from "@/lib/prisma";
import { NextPage } from "next";
import { redirect } from "next/navigation";


const ProfilePage: NextPage = async () => {
  const user = await getUserSession();
  if (!user?.email) return redirect("/not-auth");

  const profile = await prisma.user.findUnique({ where: { email: user.email } });
  if (!profile) return redirect("/not-auth");

  return (
    <ProfileForm
      profile={profile}
    />
  )
}

export default ProfilePage;