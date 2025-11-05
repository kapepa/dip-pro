"use client"

import { FC, ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "next-auth/react"
import NextTopLoader from 'nextjs-toploader';

interface ProvidersProps {
  children: ReactNode,
}

const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <>
      <NextTopLoader
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        zIndex={1600}
        showAtBottom={false}
      />
      <SessionProvider>
        {children}
      </SessionProvider>
      <Toaster />
    </>
  )
}

export { Providers }