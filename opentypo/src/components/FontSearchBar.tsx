"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function FontSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Input
        placeholder="폰트의 이름을 입력해주세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-64"
      />
    </>
  );
}
