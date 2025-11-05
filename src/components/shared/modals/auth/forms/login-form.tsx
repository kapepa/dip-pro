import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, FormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form/form-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  onClose?: VoidFunction
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { onClose } = props;
  const methods = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: FormLoginValues) => {
    try {
      const res = await signIn(
        "credentials",
        {
          ...data,
          redirect: false,
        }
      )

      if (!res?.ok) throw new Error()

      toast.success("Ви успішно увійшли до облікового запису")
      onClose?.()
    } catch (err) {
      console.error(err)
      toast.error("Не вдалося ввійти в аккаунт")
    }
  }

  return (
    <FormProvider
      {...methods}
    >
      <form
        className="flex flex-col gap-4 xs:gap-5 sm:gap-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div
          className="flex justify-between items-start xs:items-center"
        >
          <div
            className="mr-2 xs:mr-3 sm:mr-4 flex-1"
          >
            <Title
              size="md"
              className={`
                font-bold
                text-lg xs:text-xl sm:text-2xl
                mb-2 xs:mb-3
              `}
            >
              Вхід до облікового запису
            </Title>
            <p
              className={`
                text-gray-400
                text-xs xs:text-sm sm:text-base
                leading-tight xs:leading-normal
              `}
            >
              Введіть свою пошту щоб увійти до облікового запису
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-ico"
            className={`
              w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16
              flex-shrink-0 hidden md:block
            `}
          />
        </div>

        <FormInput
          name="email"
          label="E-Mail"
          required
          className={`
            text-sm xs:text-base
          `}
        />

        <FormInput
          name="password"
          label="Пароль"
          type="password"
          required
          className={`
            text-sm xs:text-base
          `}
        />

        <Button
          type="submit"
          loading={methods.formState.isSubmitting}
          className={`
            text-sm xs:text-base sm:text-lg
            mt-2 xs:mt-3 py-6
          `}
        >
          Увійти
        </Button>
      </form>
    </FormProvider>
  )
}

export { LoginForm }