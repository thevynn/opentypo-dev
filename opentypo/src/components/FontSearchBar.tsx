"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function FontSearchBar() {
  const t = useTranslations("FontSearchBar");

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Input
        placeholder={t("InputPlaceholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-64"
      />
    </>
  );
}
