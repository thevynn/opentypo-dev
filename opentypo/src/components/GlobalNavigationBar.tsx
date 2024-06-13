import Link from "next/link";
import BrandLogo from "@public/images/brandLogo.svg";

export default function GlobalNavigationBar() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6">
      <Link href="#" className="mr-6 flex items-center" prefetch={false}>
        <BrandLogo width={120} className="" />
      </Link>
      <nav className="flex gap-6">
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          폰트
        </Link>
      </nav>
    </header>
  );
}
