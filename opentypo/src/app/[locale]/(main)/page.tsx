import { createClient } from "@/utils/supabase/server";
import React from "react";
import Landing from "@/components/Landing";
import ExploreSection from "@/components/ExploreSection";

export default async function Home() {
  const supabase = createClient();
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!SUPABASE_URL) {
    console.error("NEXT_PUBLIC_SUPABASE_URL is not defined");
    throw new Error("Configuration error");
  }

  try {
    console.log("Fetching data from Supabase...");

    // 모든 데이터를 한 번에 가져오도록 쿼리 작성
    const [
      { data: fonts, error: fontsError },
      { data: categories, error: categoriesError },
      { data: personalities, error: personalitiesError },
      { data: languages, error: languagesError },
      { data: fontPersonalities, error: fontPersonalitiesError },
    ] = await Promise.all([
      supabase.from("fonts").select("*"),
      supabase.from("category").select("*"),
      supabase.from("personality").select("*"),
      supabase.from("language").select("*"),
      supabase.from("font_personality").select("font_id, personality_id"),
    ]);

    if (
      fontsError ||
      categoriesError ||
      personalitiesError ||
      languagesError ||
      fontPersonalitiesError
    ) {
      console.error(
        "Error fetching data:",
        fontsError ||
          categoriesError ||
          personalitiesError ||
          languagesError ||
          fontPersonalitiesError,
      );
      throw new Error("Failed to fetch data");
    }

    console.log("Data fetched:", {
      fonts,
      categories,
      personalities,
      languages,
      fontPersonalities,
    });

    // 데이터 가공
    const fontsWithParsedData = fonts.map((font) => {
      console.log(`Processing font: ${font.name}`);

      const personalitiesForFont = fontPersonalities
        .filter((fp) => fp.font_id === font.id)
        .map(
          (fp) => personalities.find((p) => p.id === fp.personality_id)?.name,
        )
        .filter(Boolean);

      let parsedAuthors = [];
      if (typeof font.author === "string") {
        try {
          parsedAuthors = JSON.parse(font.author);
        } catch (error) {
          console.error(
            `Error parsing author data for font ${font.name}:`,
            error,
          );
        }
      } else if (Array.isArray(font.author)) {
        parsedAuthors = font.author;
      }

      const languageName =
        languages.find((lang) => lang.id === font.language_id)?.name ||
        "unknown";

      return {
        ...font,
        author: parsedAuthors,
        fontUrl: `${SUPABASE_URL}/storage/v1/object/public/fonts/${font.font_file_path}`,
        personalities: personalitiesForFont,
        language: languageName,
      };
    });

    console.log("Fonts with parsed data:", fontsWithParsedData);

    return (
      <main className="w-screen flex justify-center lg:px-12 pb-16 px-4">
        <div className="w-full max-w-screen-xl">
          <Landing />
          <div className="flex flex-col gap-4">
            <ExploreSection
              categoryOptions={
                categories?.map((c) => ({ id: c.id, label: c.name })) || []
              }
              personalityOptions={
                personalities?.map((p) => ({ label: p.name })) || []
              }
              languageOptions={languages?.map((l) => ({ label: l.name })) || []}
              fonts={fontsWithParsedData}
            />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error processing fonts:", error);
    return (
      <p>
        An error occurred while processing the data. Please try again later.
      </p>
    );
  }
}
