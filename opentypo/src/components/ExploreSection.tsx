"use client";
import * as React from "react";
import CategorySelector from "@/components/CategorySelector";
import VibeSelector from "@/components/VibeSelector";

export default function ExploreSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <CategorySelector />
        <VibeSelector />
      </div>
    </div>
  );
}
