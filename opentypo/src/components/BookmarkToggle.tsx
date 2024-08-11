import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface BookmarkToggleProps {
  fontId: number;
}

export default function BookmarkToggle({ fontId }: BookmarkToggleProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("font_id", fontId);

      if (error) {
        console.error("Error fetching bookmark status:", error);
      } else if (data && data.length > 0) {
        setIsBookmarked(true);
      }
    };

    fetchBookmarkStatus();
  }, [fontId]);

  const toggleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmark();
    } else {
      await addBookmark();
    }
  };

  const addBookmark = async () => {
    const { error } = await supabase
      .from("bookmarks")
      .insert({ font_id: fontId });

    if (error) {
      console.error("Error adding bookmark:", error);
    } else {
      setIsBookmarked(true);
    }
  };

  const removeBookmark = async () => {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("font_id", fontId);

    if (error) {
      console.error("Error removing bookmark:", error);
    } else {
      setIsBookmarked(false);
    }
  };

  return (
    <Button variant="ghost" className="rounded-full" onClick={toggleBookmark}>
      <Bookmark
        className={`h-4 w-4 ${isBookmarked ? "text-yellow-500" : ""}`}
      />
    </Button>
  );
}
