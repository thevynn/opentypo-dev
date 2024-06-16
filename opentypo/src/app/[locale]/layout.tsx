import type { Metadata } from "next";
import "@/styles/globals.css";

import localFont from "next/font/local";
import SessionWrapper from "@/components/SessionWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "OpenTypo",
  description: "Free, but Better.",
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
            >{children}
            </ThemeProvider>
            <Toaster />
          </body>
        </NextIntlClientProvider>
      </SessionWrapper>
    </html>
  );
}
