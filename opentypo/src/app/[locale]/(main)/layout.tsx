import type { Metadata } from "next";
import Head from "next/head";
import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";

import localFont from "next/font/local";
import SessionWrapper from "@/components/SessionWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

import GlobalNavigationBar from "@/components/GlobalNavigationBar";

const pretendard = localFont({
  src: "../../../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata = {
  title: "OpenTypo™",
  description: "유료보다 예쁜 상업적 무료 폰트를 큐레이팅 해드립니다.",
  generator: "Next.js",
  applicationName: "OpenTypo™",
  referrer: "origin-when-cross-origin",
  keywords: [
    "폰트",
    "글꼴",
    "무료폰트",
    "상업적무료",
    "오픈폰트",
    "타이포그래피",
    "무료폰트 모음",
    "fonts",
    "typography",
    "free fonts",
    "open fonts",
    "예쁜폰트",
    "디자인 폰트",
    "디자이너",
    "마케터",
    "PPT",
    "마케팅",
    "그래픽",
  ],
  authors: [{ name: "thevynn" }, { name: "Design eXperience™" }],
  creator: "thevynn",
  publisher: "Design eXperience™",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/fav.png",
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <SessionWrapper>
        <NextIntlClientProvider messages={messages}>
          <body className={pretendard.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader
                color="#ff2f00"
                initialPosition={0.08}
                crawlSpeed={200}
                height={2}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
              />
              <GlobalNavigationBar />
              {children}
              <Footer />
            </ThemeProvider>
            <Toaster />
          </body>
        </NextIntlClientProvider>
      </SessionWrapper>
    </html>
  );
}
