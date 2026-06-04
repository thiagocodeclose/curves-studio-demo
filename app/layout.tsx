// @ts-nocheck
import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { getGarrison365Config, buildCssVars } from "@/lib/garrison365-config";

import { Garrison365LivePreview } from "@/components/Garrison365LivePreview";
import { TemplateSiteAdapter } from "@/components/TemplateSiteAdapter";
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Curves & Co — Nashville, TN",
  description:
    "Women's fitness community in Nashville. HIIT, strength, dance, and more. Strong is the new beautiful.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cfg = await getGarrison365Config();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" style={vars as React.CSSProperties}>
      <body className={`${nunito.variable} ${nunitoSans.variable}`}>
        {children}
        <TemplateSiteAdapter />
        <Garrison365LivePreview />
      </body>
    </html>
  );
}
