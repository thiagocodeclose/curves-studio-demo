// @ts-nocheck
import type { Metadata } from 'next';
import { Nunito, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { getKorivaConfig, buildCssVars } from '@/lib/koriva-config';

import { KorivaLivePreview } from '@/components/KorivaLivePreview';
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Curves & Co — Nashville, TN',
  description: 'Women\'s fitness community in Nashville. HIIT, strength, dance, and more. Strong is the new beautiful.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getKorivaConfig();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" style={vars as React.CSSProperties}>
      <body className={`${nunito.variable} ${nunitoSans.variable}`}>{children}<KorivaLivePreview /></body>
    </html>
  );
}
