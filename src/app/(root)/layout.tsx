import { Header } from "@/components/shared/header";
import { Metadata } from "next";
import { FC, ReactNode, Suspense } from "react";

interface RootLayoutProps {
  modal: ReactNode,
  children: ReactNode,
}

export const metadata: Metadata = {
  title: "Pizza | Home",
  description: "Pizza",
};

const RootLayout: FC<RootLayoutProps> = (props) => {
  const { modal, children } = props;

  return (
    <main
      className="min-h-screen"
    >
      <Suspense
        fallback={<div>Loading...</div>}
      >
        <Header />
      </Suspense>
      {modal}
      {children}
    </main>
  )
}

export default RootLayout;