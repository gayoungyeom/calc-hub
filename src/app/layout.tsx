import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://calchubs.org"),
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
        <meta name="google-adsense-account" content="ca-pub-4343769094636612" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CalcHub",
              url: "https://calchubs.org",
              logo: "https://calchubs.org/icon.png",
              description:
                "Free tax calculator platform for freelancers, gig workers, and self-employed individuals. 프리랜서와 N잡러를 위한 무료 세금 계산기 플랫폼.",
              foundingDate: "2026",
              sameAs: ["https://github.com/gayoungyeom/calc-hub"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://calchubs.org/kr/about",
                availableLanguage: ["Korean", "English"],
              },
              knowsAbout: [
                "Tax Calculation",
                "Korean Income Tax",
                "US Federal Tax",
                "Self-Employment Tax",
                "Freelancer Tax",
              ],
            }),
          }}
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","CLARITY_PROJECT_ID");
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
