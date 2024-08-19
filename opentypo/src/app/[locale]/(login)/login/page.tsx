"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

import BrandLogo from "@public/images/brandLogo.svg";
import GoogleLogo from "@public/images/googleLogo.svg";
import GithubLogo from "@public/images/githubLogo.svg";
import AppleLogo from "@public/images/appleLogo.svg";

import { Instrument_Serif } from "next/font/google";

import { cls } from "@/utils/cls";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export default function Login() {
  return (
    <div key="1" className="grid h-dvh w-full grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block overflow-hidden	">
        <motion.div
          className="flex flex-col z-20 absolute bottom-0 left-0 p-10 gap-4"
          initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <p className="text-white w-full text-3xl font-semibold text-balance">
            “Typography is the craft of endowing human language with a durable
            visual form.”
          </p>
          <p className="text-white w-full text-base font-regular text-balance">
            Robert Bringhurst, The Elements of Typographic Style
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(50px)" }}
          animate={{ opacity: 1, filter: "blur(0)" }}
          transition={{
            duration: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <img
            alt="Sign up illustration"
            className="h-dvh w-full object-cover"
            height="800"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Robert_Bringhurst_2016.jpg"
            style={{
              aspectRatio: "800/800",
              objectFit: "cover",
            }}
            width="800"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/60 to-transparent" />
      </div>
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-md space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div>
            <Link className="flex items-center gap-2 mt-1" href="/">
              <BrandLogo width={100} />
            </Link>
            <h2
              className={cls(
                instrumentSerif.className,
                "mt-6 text-4xl tracking-tight text-neutral-900 dark:text-neutral-50",
              )}
            >
              Sign in with your social account
            </h2>
          </div>
          <div className="space-y-5">
            <div className="space-y-3">
              <Button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full"
                variant="default"
              >
                <GoogleLogo className="mr-2 h-5 w-5" />
                Google 계정으로 로그인
              </Button>
              <Button className="w-full" variant="default">
                <GithubLogo className="mr-2 h-5 w-5" />
                GitHub 계정으로 로그인
              </Button>
              <Button className="w-full" variant="default">
                <AppleLogo className="mr-2 h-5 w-5" />
                Apple ID로 로그인
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  아직 계정이 없으신가요?
                </span>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              SNS 계정으로 회원가입
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AppleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
