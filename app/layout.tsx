import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#c2410c",
};

export const metadata: Metadata = {
  title: "CubaCombo — Cuida a tu familia desde lejos",
  description:
    "Envia combos de productos esenciales a tus seres queridos en Cuba. Rapido, confiable, con amor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-dvh antialiased`}>
      <body className="min-h-dvh flex flex-col bg-background">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
