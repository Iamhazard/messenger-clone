import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TosterContext from "@/app/context/TosterContext";
import AuthContent from "./context/AuthContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger clone",
  description: "messenger clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContent>
          <TosterContext />
          {children}
        </AuthContent>
      </body>
    </html>
  );
}
