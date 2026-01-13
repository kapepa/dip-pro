"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC, useTransition } from "react";
import { formProfileSchema, FormProfileValues } from "./modals/auth/forms/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form/form-input";
import { Button } from "../ui/button";
import { deleteUser, updateUserInfo } from "@/app/actions";
import { FormPhone } from "./form/form-phone";
import { ConfirmModal } from "./modals/confirm-modal";
import { useConfirm } from "@/hooks/useConfirm";

interface ProfileFormProps {
  profile: User;
}

const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { profile } = props;
  const {
    title,
    subtitle,
    openConfirmModal,
    handlerClose,
    handlerSuccess,
    handlerOpenModal,
    isPending: isDeletePending
  } = useConfirm();

  const methods = useForm<FormProfileValues>({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      email: profile.email || "",
      fullName: profile.fullName || "",
      phone: profile.phone || "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: FormProfileValues) => {
    try {
      const submitData = {
        ...data,
        password: data.password || undefined,
        confirmPassword: data.confirmPassword || undefined
      };

      await updateUserInfo(submitData);
      toast.success("Дані оновлені");

      methods.reset({
        ...methods.getValues(),
        password: "",
        confirmPassword: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("Помилка під час оновлення даних");
    }
  };

  const handlerSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleDeleteAccount = () => {
    handlerOpenModal(
      {
        title: "Увага",
        subtitle: "Ви впевнені, що хочете видалити власний профіль? Цю дію неможливо скасувати."
      },
      async () => {
        try {
          await deleteUser(profile.id).then(() => {
            toast.success("Профіль видалено");
            signOut({ callbackUrl: "/" });
          });
        } catch (err) {
          console.error(err);
          toast.error("Помилка під час видалення профілю");
          throw err;
        }
      }
    );
  };

  const hasChanges = methods.formState.isDirty;

  return (
    <>
      <ConfirmModal
        open={openConfirmModal}
        title={title}
        onClose={handlerClose}
        onSuccess={handlerSuccess}
        subtitle={subtitle}
        isLoading={isDeletePending}
      />
      <Container className="my-10">
        <Title size="md" className="font-bold">
          Особисті дані
        </Title>
        <FormProvider {...methods}>
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
            <FormPhone
              name="phone"
              label="Телефон"
              type="tel"
              required
              placeholder="+38 (0__) ___-__-__"
            />

            <div className="mt-4">
              <Title size="sm" className="font-bold mb-4">
                Зміна паролю
              </Title>
              <div className="space-y-4">
                <FormInput
                  name="password"
                  label="Новий пароль"
                  type="password"
                  placeholder="Залиште порожнім, якщо не хочете змінювати"
                />
                <FormInput
                  name="confirmPassword"
                  label="Повторіть пароль"
                  type="password"
                  placeholder="Підтвердьте новий пароль"
                />
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <Button
                type="submit"
                disabled={!hasChanges || methods.formState.isSubmitting}
                loading={methods.formState.isSubmitting}
                className="text-base w-full"
              >
                {methods.formState.isSubmitting ? "Збереження..." : "Зберегти зміни"}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={handlerSignOut}
                className="text-base w-full"
              >
                Вийти з акаунту
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteAccount}
                loading={isDeletePending}
                disabled={isDeletePending}
                className="text-base w-full"
              >
                {isDeletePending ? "Видалення..." : "Видалити профіль"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export { ProfileForm };