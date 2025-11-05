import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="ico" href="/logo.png" />
      </head>
      <body
        className={`${nunito.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
