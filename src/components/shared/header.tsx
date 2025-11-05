"use client"

import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { CartButton } from "./cart-button";
import { SearchInput } from "./search-input";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth/auth-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface HeaderProps {
  hasCart?: boolean
  hasSearch?: boolean
  className?: string
}

const Header: FC<HeaderProps> = (props) => {
  const { hasCart = true, hasSearch = true, className } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openAuthModal, setOpneAUthModal] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams.has("verified")) {
      queueMicrotask(() => {
        toast.success("Пошта підтверджена")
        router.push("/")
      })
    }
  }, [searchParams])

  return (
    <header
      className={cn("border", className)}
    >
      <Container
        className="flex flex-col lg:flex-row items-center justify-between gap-4 xs:gap-5 sm:gap-6 py-4 xs:py-5 sm:py-6 md:py-7 lg:py-8"
      >
        {/* Logo Section */}
        <Link
          href={"/"}
          className="cursor-pointer w-full sm:w-auto"
        >
          <div
            className="flex items-center gap-3 xs:gap-4 justify-center sm:justify-start"
          >
            <Image
              src="/logo.png"
              width={30}
              height={30}
              alt="Logo"
              className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-[35px] lg:h-[35px]"
            />
            <div className="text-center sm:text-left">
              <h1
                className="whitespace-nowrap text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-2xl uppercase font-black leading-tight"
              >
                Піца від Ірини
              </h1>
              <p
                className="text-xs xs:text-sm text-gray-400 leading-3 mt-1"
              >
                Смачніше не буває.
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="w-full sm:flex-1 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 order-3 lg:order-2">
            <SearchInput />
          </div>
        )}

        <div
          className="flex items-center gap-2 xs:gap-3 sm:gap-3 md:gap-4 w-full sm:w-auto justify-center sm:justify-end order-2 lg:order-3"
        >
          <AuthModal
            open={openAuthModal}
            onClose={() => { setOpneAUthModal(false) }}
          />
          <ProfileButton
            onClickSingIn={() => { setOpneAUthModal(true) }}
          />
          {
            hasCart && <CartButton />
          }
        </div>
      </Container>
    </header>
  )
}

export { Header }