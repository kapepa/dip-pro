import { Header } from "@/components/shared/header";
import { Metadata } from "next";
import { FC, ReactNode, Suspense } from "react";

interface CheckoutLayoutProps {
  children: ReactNode,
}

export const metadata: Metadata = {
  title: "Pizza | Checkout",
  description: "Pizza",
};

const CheckoutLayout: FC<CheckoutLayoutProps> = (props) => {
  const { children } = props;

  return (
    <main
      className="min-h-screen bg-[#F4F1EE]"
    >
      <Suspense
        fallback={<div>Loading...</div>}
      >
        <Header
          hasCart={false}
          hasSearch={false}
          className="border-gray-200"
        />
      </Suspense>
      {children}
    </main>
  )
}

export default CheckoutLayout;