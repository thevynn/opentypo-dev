"use client";
import * as React from "react";
import { Languages, Palette, Tag } from "lucide-react";
import MultiSelector from "./MultiSelector";
import FontSearchBar from "@/components/FontSearchBar";
import FontPreviewCard from "@/components/FontPreviewCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

interface ExploreSectionProps {
  categoryOptions: { id: number; label: string }[];
  personalityOptions: { label: string }[];
  languageOptions: { label: string }[];
  fonts: any[];
}

export default function ExploreSection({
  categoryOptions,
  personalityOptions,
  languageOptions,
  fonts,
}: ExploreSectionProps) {
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    [],
  );
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const [selectedPersonalities, setSelectedPersonalities] = React.useState<
    string[]
  >([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredFonts, setFilteredFonts] = React.useState(fonts);
  const [items, setItems] = React.useState(filteredFonts.slice(0, 10));
  const [hasMore, setHasMore] = React.useState(filteredFonts.length > 10);

  React.useEffect(() => {
    const newFilteredFonts = fonts.filter((font) => {
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(font.language);

      const fontCategoryName = categoryOptions.find(
        (c) => c.id === font.category_id,
      )?.label;
      const matchesCategory =
        selectedCategories.length === 0 ||
        (fontCategoryName && selectedCategories.includes(fontCategoryName));

      const matchesPersonality =
        selectedPersonalities.length === 0 ||
        (Array.isArray(font.personalities) &&
          font.personalities.some((p: string) =>
            selectedPersonalities.includes(p),
          ));
      const matchesSearch = font.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        matchesLanguage &&
        matchesCategory &&
        matchesPersonality &&
        matchesSearch
      );
    });

    setFilteredFonts(newFilteredFonts);
    setItems(newFilteredFonts.slice(0, 10));
    setHasMore(newFilteredFonts.length > 10);
  }, [
    selectedLanguages,
    selectedCategories,
    selectedPersonalities,
    searchTerm,
    fonts,
    categoryOptions,
  ]);

  const fetchMoreData = () => {
    if (items.length >= filteredFonts.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems(filteredFonts.slice(0, items.length + 10));
    }, 500);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <MultiSelector
          items={languageOptions}
          label="언어"
          icon={<Languages className="h-4 w-4" />}
          onSelectionChange={setSelectedLanguages}
        />
        <MultiSelector
          items={categoryOptions}
          label="카테고리"
          icon={<Tag className="h-4 w-4" />}
          onSelectionChange={setSelectedCategories}
        />
        <MultiSelector
          items={personalityOptions}
          label="느낌"
          icon={<Palette className="h-4 w-4" />}
          onSelectionChange={setSelectedPersonalities}
        />
        <FontSearchBar onSearch={setSearchTerm} />
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>End of Items</b>
        //   </p>
        // }
      >
        <div className="flex flex-col gap-4">
          {items.length > 0 ? (
            items.map((font) => (
              <FontPreviewCard
                key={font.id}
                name={font.name}
                authors={font.author}
                fontUrl={font.fontUrl}
                downloadUrl={font.download_url}
                comment={font.comment} // comment 필드 추가
              />
            ))
          ) : (
            <div className="w-full p-12 rounded-xl bg-neutral-100 flex flex-col justify-center">
              <h1
                className={cls(
                  instrumentSerif.className,
                  "text-neutral-400 text-4xl text-center tracking-tight",
                )}
              >
                Not Found
              </h1>
              <p className="text-neutral-400 text-md font-medium text-center">
                해당하는 폰트가 없어요 :(
              </p>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
