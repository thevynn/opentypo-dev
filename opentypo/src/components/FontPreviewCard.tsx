'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CloudDownload, Bookmark } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

interface Author {
  name: string;
  link: string;
}

interface FontCardProps {
  name: string;
  authors: Author[];
  fontUrl: string;
  downloadUrl: string; // 다운로드 URL을 위한 추가 필드
}

export default function FontPreviewCard({
  name,
  authors,
  fontUrl,
  downloadUrl, // 다운로드 URL을 props로 받아옴
}: FontCardProps) {
  console.log("FontPreviewCard - Rendering:", { name, authors, fontUrl });

  const [editableName, setEditableName] = useState(name);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const fontFace = new FontFace(name, `url("${fontUrl}")`);
    fontFace
      .load()
      .then((loadedFace) => {
        document.fonts.add(loadedFace);
        setFontLoaded(true);
      })
      .catch((err) => {
        console.error(`Error loading font ${name}:`, err);
      });
  }, [name, fontUrl]);

  const authorElements = authors.map((author, index) => (
    <span key={index}>
      <a className="hover:underline" href={author.link} target="_blank" rel="noopener noreferrer">
        {author.name}
      </a>
      {index < authors.length - 1 ? ", " : ""}
    </span>
  ));

  return (
    <Card className="w-full overflow-hidden rounded-xl border border-neutral-200">
      <CardHeader>
        <div className="w-full flex flex-row justify-between">
          <p className="text-base font-semibold text-neutral-500">{name}</p>
        </div>
      </CardHeader>
      <CardContent>
        <input
          type="text"
          className="text-6xl w-full border-none outline-none bg-transparent"
          style={{
            fontFamily: fontLoaded ? name : "inherit",
            opacity: fontLoaded ? 1 : 0.5,
          }}
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
        />
      </CardContent>
      <CardFooter className="bg-white py-4 flex flex-row justify-between">
        <p className="text-sm">Designed by {authorElements}</p>
        <div className="flex flex-row gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  <CloudDownload className="h-4 w-4 mr-2" />
                  <Link
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-2"
                  >
                    다운로드
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>원작자의 다운로드 페이지로 이동합니다.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}
