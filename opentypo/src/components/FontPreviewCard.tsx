"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CloudDownload } from "lucide-react";
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

interface Author {
  name: string;
  link: string;
}

interface FontCardProps {
  name: string;
  authors: Author[];
  fontUrl: string;
  downloadUrl: string;
  comment: string; // 추가된 한줄평 필드
}

export default function FontPreviewCard({
  name,
  authors,
  fontUrl,
  downloadUrl,
  comment, // 한줄평 필드를 props로 받아옴
}: FontCardProps) {
  // 폰트 이름을 편집할 수 있는 상태
  const [editableName, setEditableName] = useState(name);
  // 폰트 로딩 여부 상태
  const [fontLoaded, setFontLoaded] = useState(false);

  // 폰트 로딩 및 상태 관리
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

  // 폰트 이름이 변경될 때마다 editableName 상태 업데이트
  useEffect(() => {
    setEditableName(name);
  }, [name]);

  // 저자 정보를 JSX로 변환
  const authorElements = authors.map((author, index) => (
    <span key={index}>
      <a
        className="hover:underline"
        href={author.link}
        target="_blank"
        rel="noopener noreferrer"
      >
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
      <CardContent className="flex flex-col gap-y-3">
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
        <p className="text-sm text-neutral-600">Designed by {authorElements}</p>
      </CardContent>
      <CardFooter className="bg-white py-3 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-row gap-3 w-full">
          <div className="flex-none text-sm font-medium text-neutral-500">
            코멘터리
          </div>
          <div className="text-sm font-regular">{comment}</div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download font ${name}`}
                className="flex-none w-full md:w-fit pl-4 md:pl-3 pr-8 md:pr-4 py-3 md:py-2 flex items-center justify-center rounded-full font-semibold text-neutral-800 border  hover:bg-gray-50"
              >
                <CloudDownload className="h-4 w-4 mr-2" />
                <p className="text-md md:text-sm">다운로드</p>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>원작자의 다운로드 페이지로 이동합니다.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
