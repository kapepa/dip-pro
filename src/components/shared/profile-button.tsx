"use client"

import { FC, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface ProfileButtonProps {
  className?: string,
  onClickSingIn?: () => void,
}

const ProfileButton: FC<ProfileButtonProps> = (props) => {
  const { className, onClickSingIn } = props;
  const { data: session } = useSession()

  const ifSession = useMemo(() => {
    if (session) return (
      <Link
        href="/profile"
      >
        <Button>
          <CircleUser
            size={18}
          />
          Профіль
        </Button>
      </Link>
    )

    return (
      <Button
        variant="outline"
        onClick={onClickSingIn}
        className="flex items-center gap-1"
      >
        <User
          size={16}
        />
        Увійти
      </Button>
    )
  }, [session])

  return (
    <div
      className={className}
    >
      {ifSession}
    </div>
  )
}

export { ProfileButton }