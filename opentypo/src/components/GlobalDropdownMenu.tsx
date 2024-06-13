"use client";

import { signIn } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";

import { useTranslations } from "next-intl";
import { Menu, LogIn, User, Bookmark, Settings, LogOut } from "lucide-react";
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
        <CustomButton variant="circle" size="icon">
          <Menu className="h-4 w-4" />
        </CustomButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {session ? (
          <></>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogIn className="mr-2 h-4 w-4" />
            <span className="font-medium">{t("login")}</span>
          </DropdownMenuItem>
        )}
        {session ? <></> : <DropdownMenuSeparator />}
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span className="font-medium">{t("profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bookmark className="mr-2 h-4 w-4" />
          <span className="font-medium">{t("bookmarks")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span className="font-medium">{t("settings")}</span>
        </DropdownMenuItem>
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
