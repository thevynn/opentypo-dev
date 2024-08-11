"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";

import { useTranslations } from "next-intl";
import {
  Menu,
  LogIn,
  User,
  Bookmark,
  Settings,
  LogOut,
  FileType2,
  CircleHelp,
  Book,
} from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

export default function HamburgerMenu() {
  const { data: session } = useSession();
  const t = useTranslations("Interface");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CustomButton
          variant="circle"
          size="icon"
          style={{
            backgroundImage: session?.user?.image
              ? `url(${session.user.image})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!session?.user?.image && <Menu className="h-4 w-4" />}
        </CustomButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem asChild>
          <Link href="/about" prefetch={false}>
            <Book className="mr-2 h-4 w-4" />
            <span className="font-medium">서비스 소개</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <CircleHelp className="mr-2 h-4 w-4" />
          <span className="font-medium">FAQ</span>
        </DropdownMenuItem>
        {session ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span className="font-medium">{t("profile")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              <span className="font-medium">{t("bookmarks")}</span>
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
        {/* <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span className="font-medium">{t("settings")}</span>
        </DropdownMenuItem> */}
        {session ? <DropdownMenuSeparator /> : <></>}
        {session ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <span className="font-medium text-red-500">{t("log-out")}</span>
          </DropdownMenuItem>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
