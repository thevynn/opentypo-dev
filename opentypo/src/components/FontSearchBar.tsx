"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface FontSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function FontSearchBar({ onSearch }: FontSearchBarProps) {
  const t = useTranslations("FontSearchBar");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <Input
      placeholder={t("InputPlaceholder")}
      value={searchTerm}
      onChange={handleSearch}
      className="w-full lg:w-64"
    />
  );
}
