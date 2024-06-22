"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface Author {
  name: string;
  link: string;
}

interface FontCardProps {
  name: string;
  authors: Author[];
}

export default function FontPreviewCard({ name, authors }: FontCardProps) {
  const [editableName, setEditableName] = useState(name);

  const authorElements = authors.map((author, index) => (
    <span key={index}>
      <a href={author.link} target="_blank" rel="noopener noreferrer">
        {author.name}
      </a>
      {index < authors.length - 1 ? ", " : "."}
    </span>
  ));

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex flex-row justify-between ">
          <p className="text-base font-semibold text-neutral-500">{name}</p>
          <Bookmark className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <input
          type="text"
          className="text-6xl border-none outline-none"
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <p className="text-sm">Designed by {authorElements}</p>
      </CardFooter>
    </Card>
  );
}
