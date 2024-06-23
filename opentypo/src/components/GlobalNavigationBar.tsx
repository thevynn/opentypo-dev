"use client";

import Link from "next/link";
import BrandLogo from "@public/images/brandLogo.svg";
import GlobalDropdownMenu from "@/components/GlobalDropdownMenu";
import { FeedbackDialog } from "@/components/FeedbackDialog";

export default function GlobalNavigationBar() {
  return (
    <header className="sticky top-0 w-screen flex shrink-0 items-center justify-items-center justify-center bg-white dark:bg-neutral-900 py-4 px-12">
      <div className="w-full  flex shrink-0 items-center place-content-between">
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
