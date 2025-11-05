"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { FC, useMemo, useState } from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface AuthModalProps {
  open: boolean,
  onClose: () => void,
}

const AuthModal: FC<AuthModalProps> = (props) => {
  const { open, onClose } = props;
  const [type, setType] = useState<"login" | "register">("login");
  const handlerSwitchType = () => setType(type === "login" ? "register" : "login")
  const handlerClose = () => {
    onClose()
  }

  const ViewForm = useMemo(() => {
    if (type === "login") return (
      <LoginForm
        onClose={() => onClose()}
      />
    )

    return (
      <RegisterForm
        onClose={() => onClose()}
      />
    )
  }, [type])

  return (
    <Dialog
      open={open}
      onOpenChange={handlerClose}
    >
      <DialogContent
        className={`
          bg-white p-4 xs:p-6 sm:p-8 md:p-10
          w-[calc(100vw-2rem)] xs:w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px]
          max-w-[calc(100vw-2rem)]
          mx-auto
        `}
      >
        <DialogTitle />
        <DialogHeader>
          {ViewForm}
        </DialogHeader>
        <hr className="my-4 xs:my-5 sm:my-6" />
        <DialogFooter className={`
          flex flex-col flex-wrap lg:flex-nowrap xs:flex-row gap-3 xs:gap-4 sm:gap-5
          w-full
        `}>
          <Button
            variant="secondary"
            type="button"
            className={`
              gap-2 p-2 xs:flex-1 grow
              h-10 xs:h-11 sm:h-12
            `}
            onClick={() => {
              signIn("github", { callbackUrl: "/", redirect: true })
            }}
          >
            <img
              className="w-5 h-5 xs:w-6 xs:h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="GitHub"
            />
            <span className="text-sm xs:text-base">GitHub</span>
          </Button>
          <Button
            variant="secondary"
            type="button"
            className={`
              gap-2 p-2 xs:flex-1 grow
              h-10 xs:h-11 sm:h-12
            `}
            onClick={() => {
              signIn("google", { callbackUrl: "/", redirect: true })
            }}
          >
            <img
              className="w-5 h-5 xs:w-6 xs:h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
            />
            <span className="text-sm xs:text-base">Google</span>
          </Button>
        </DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={handlerSwitchType}
          className={`
            w-full
            h-10 xs:h-11 sm:h-12
            mt-3 xs:mt-4 sm:mt-5
            text-sm xs:text-base
          `}
        >
          {type === "login" ? "Реєстрація" : "Логін"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export { AuthModal }