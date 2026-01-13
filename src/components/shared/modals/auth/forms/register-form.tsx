import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, FormRegisterValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form/form-input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/app/actions";
import { FormPhone } from "@/components/shared/form/form-phone";

interface RegisterFormProps {
  onClose?: VoidFunction
}

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { onClose } = props;
  const methods = useForm<FormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = async (data: FormRegisterValues) => {
    try {
      await registerUser(data)
      toast.success("Ви успішно зареєстрували свій обліковий запис.")
      onClose?.()
    } catch (err) {
      console.error(err)
      toast.error("Не вдалося зареєструвати аккаунт")
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
              Реєстрація облікового запису
            </Title>
            <p
              className={`
                text-gray-400
                text-xs xs:text-sm sm:text-base
                leading-tight xs:leading-normal
              `}
            >
              Введіть дані для реєстрації
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
          name="fullName"
          label="Ім'я"
          required
          className={`
            text-sm xs:text-base
          `}
        />

        <FormInput
          name="email"
          label="E-Mail"
          required
          className={`
            text-sm xs:text-base
          `}
        />

        <FormPhone
          name="phone"
          label="Tелефон"
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

        <FormInput
          name="confirmPassword"
          label="Підтвердження пароля"
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
          Реєстрація
        </Button>
      </form>
    </FormProvider>
  )
}

export { RegisterForm }