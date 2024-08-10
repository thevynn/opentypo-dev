import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Bookmark } from "lucide-react";

interface Author {
  name: string;
  link: string;
}

interface FontCardProps {
  name: string;
  authors: Author[];
  fontUrl: string;
}

export default function FontPreviewCard({ name, authors, fontUrl }: FontCardProps) {
  console.log('FontPreviewCard - Rendering:', { name, authors, fontUrl });

  const [editableName, setEditableName] = useState(name);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const fontFace = new FontFace(name, `url("${fontUrl}")`);
    fontFace.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
      setFontLoaded(true);
    }).catch(err => {
      console.error(`Error loading font ${name}:`, err);
    });
  }, [name, fontUrl]);

  const authorElements = authors.map((author, index) => (
    <span key={index}>
      <a href={author.link} target="_blank" rel="noopener noreferrer">
        {author.name}
      </a>
      {index < authors.length - 1 ? ", " : ""}
    </span>
  ));

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="w-full flex flex-row justify-between">
          <p className="text-base font-semibold text-neutral-500">{name}</p>
          <Bookmark className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <input
          type="text"
          className="text-6xl w-full border-none outline-none bg-transparent"
          style={{ 
            fontFamily: fontLoaded ? name : 'inherit',
            opacity: fontLoaded ? 1 : 0.5
          }}
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