import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/providers";
import { AppbarClient } from "../components/AppbarClient";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <AppbarClient />
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
