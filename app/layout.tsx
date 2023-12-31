import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import AppWrapper from "@/context/AppContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taxi Booking Web",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <AppWrapper>
        <html lang='en'>
          <body className={outfit.className}>
            <Navbar />
            {children}
          </body>
        </html>
      </AppWrapper>
    </ClerkProvider>
  );
}
