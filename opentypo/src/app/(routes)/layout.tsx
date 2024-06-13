import type { Metadata } from "next";
import "@/styles/globals.css";

import localFont from "next/font/local";
import SessionWrapper from "@/components/SessionWrapper";

import GlobalNavigationBar from "@/components/GlobalNavigationBar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <SessionWrapper>
        <body className={pretendard.className}>
          <GlobalNavigationBar />
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
