"use client";

import Link from "next/link";
import BrandLogo from "@public/images/brandLogo.svg";
import GlobalDropdownMenu from "@/components/GlobalDropdownMenu";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { useState, useEffect } from "react";

export default function GlobalNavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 w-screen flex shrink-0 items-center justify-items-center justify-center transition-all duration-300 bg-white dark:bg-neutral-900 py-4 px-12 ${
        isScrolled ? "z-50 bg-neutral-200/50 backdrop-blur-2xl" : ""
      }`}
    >
      <div className="w-full max-w-screen-xl flex shrink-0 items-center place-content-between">
        <Link href="/" className="mr-6 flex items-center" prefetch={false}>
          <BrandLogo
            color="primary dark:white"
            style={{ width: 100, transform: `translateY(2px)` }}
          />
        </Link>
        <nav className="flex gap-2">
          <FeedbackDialog />
          <GlobalDropdownMenu />
        </nav>
      </div>
    </header>
  );
}
