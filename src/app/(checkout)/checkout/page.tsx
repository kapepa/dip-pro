"use client"

import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import { Container } from "@/components/shared/container";
import { useCart } from "@/components/shared/hooks/use-cart";
import { Title } from "@/components/shared/title";
import { NextPage } from "next";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutPersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { CheckoutAddressForm } from "@/components/shared/checkout/checkout-address-form";
import { CheckoutFormType, CheckoutSchema } from "@/components/shared/checkout/schemas/checkout-schema";
import { cn } from "@/lib/utils";
import { createOrder } from "@/app/actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { myself } from "@/components/shared/services/auth";
import { da } from "zod/v4/locales";

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const { loading, cartItems, totalAmount, deleteCartItem, handlerCountButton } = useCart();
  const [submiting, setSubmiting] = useState<boolean>(false);
  const { data: session } = useSession();
  const methods = useForm<CheckoutFormType>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      email: "",
      phone: "",
      address: "",
      comment: "",
      fullName: "",
    }
  })

  const onSubmit = async (data: CheckoutFormType) => {
    try {
      setSubmiting(true)
      await createOrder(data)
      toast.success("Замовлення було успішно створено!")
      router.push("/")
    } catch (err) {
      console.error(data)
      toast.error("Не вдалося створити замовлення!")
    } finally {
      setSubmiting(false)
    }
  }

  useEffect(() => {
    if (session?.user && session?.user.fullName) {
      myself()
        .then(data => {
          methods.setValue("email", data!.email);
          methods.setValue("phone", data!.phone);
          methods.setValue("fullName", data!.fullName);
        })
    }
  }, [session])

  return (
    <Container
      className="mt-5"
    >
      <Title
        size="xl"
        className="font-extrabold mb-8 text-[36px]"
      >
        Place an order
      </Title>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div
            className="flex gap-10"
          >
            <div
              className="flex flex-col gap-10 flex-1 mb-20"
            >
              <CheckoutCart
                loading={loading}
                cartItems={cartItems}
                deleteCartItem={deleteCartItem}
                handlerCountButton={handlerCountButton}
              />

              <CheckoutPersonalForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />

              <CheckoutAddressForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />
            </div>

            <div
              className="w-[450px]"
            >
              <CheckoutSidebar
                loading={loading || submiting}
                totalAmount={totalAmount}
              />
            </div>

          </div>
        </form>
      </FormProvider>

    </Container>
  )
}

export default CheckoutPage;