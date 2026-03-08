import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import LocaleUpdater from "@/components/layout/LocaleUpdater";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { GA_ID } from "@/lib/gtag";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CalcHub — Tax Calculator for Freelancers | 프리랜서 세금 계산기",
  description:
    "프리랜서와 N잡러를 위한 세금 계산기. 종합소득세 환급액, 1099 Quarterly Tax를 5초 만에 계산하세요. Free tax calculator for freelancers and self-employed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <ThemeProvider>
          <LocaleUpdater />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
