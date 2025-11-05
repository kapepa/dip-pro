"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC } from "react";
import { formProfileSchema, FormProfileValues, FormRegisterValues } from "./modals/auth/forms/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form/form-input";
import { Button } from "../ui/button";
import { updateUserInfo } from "@/app/actions";

interface ProfileFormProps {
  profile: User
}

const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { profile } = props;
  const methods = useForm<FormProfileValues>({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      email: profile.email,
      fullName: profile.fullName,
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (data: FormProfileValues) => {
    try {
      await updateUserInfo(data);
      toast.success("Дані оновлені")
    } catch (err) {
      console.error(err);
      toast.error("Помилка під час оновлення даних")
    }
  }

  const handlerSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <Container
      className="my-10"
    >
      <Title
        size="md"
        className="font-bold"
      >
        Особисті дані
      </Title>
      <FormProvider
        {...methods}
      >
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-96 mt-10"
        >
          <FormInput
            name="email"
            label="E-Mail"
            type="email"
            required
          />
          <FormInput
            name="fullName"
            label="Повне ім'я"
            type="text"
            required
          />
          <FormInput
            name="password"
            label="Новий пароль"
            type="password"
            required
          />
          <FormInput
            name="confirmPassword"
            label="Повторіть пароль"
            type="password"
            required
          />
          <Button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="text-base mt-10"
          >
            Зберегти
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handlerSignOut}
            loading={methods.formState.isSubmitting}
            className="text-base"
          >
            Вийти
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}

export { ProfileForm }