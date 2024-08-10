import { createClient } from "@/utils/supabase/server";
import React from "react";
import Landing from "@/components/Landing";
import ExploreSection from "@/components/ExploreSection";

export default async function Home() {
  const supabase = createClient();

  console.log("Fetching data from Supabase...");

  const [
    { data: fonts, error: fontsError },
    { data: categories, error: categoriesError },
    { data: personalities, error: personalitiesError },
    { data: languages, error: languagesError },
  ] = await Promise.all([
    supabase.from("fonts").select("*"),
    supabase.from("category").select("*"),
    supabase.from("personality").select("*"),
    supabase.from("language").select("*"),
  ]);

  console.log("Data fetched:", { fonts, categories, personalities, languages });

  if (fontsError || categoriesError || personalitiesError || languagesError) {
    console.error(
      "Error fetching data:",
      fontsError || categoriesError || personalitiesError || languagesError,
    );
    throw new Error("Failed to fetch data");
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!SUPABASE_URL) {
    console.error("NEXT_PUBLIC_SUPABASE_URL is not defined");
    throw new Error("Configuration error");
  }

  console.log("Processing fonts...");

  try {
    // language_id를 이용해 language 이름을 가져와 fonts 데이터에 추가
    const fontsWithParsedData = await Promise.all(
      fonts.map(async (font) => {
        console.log(`Processing font: ${font.name}`);

        const { data: fontPersonalities, error: personalitiesError } =
          await supabase
            .from("font_personality")
            .select("personality_id")
            .eq("font_id", font.id);

        if (personalitiesError) {
          console.error(
            `Error fetching personalities for font ${font.name}:`,
            personalitiesError,
          );
          throw personalitiesError;
        }

        console.log(`Font personalities for ${font.name}:`, fontPersonalities);

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

        // language_id를 language 이름으로 변환
        const languageName =
          languages.find((lang) => lang.id === font.language_id)?.name ||
          "unknown";

        return {
          ...font,
          author: parsedAuthors,
          fontUrl: `${SUPABASE_URL}/storage/v1/object/public/fonts/${font.font_file_path}`,
          personalities:
            fontPersonalities
              ?.map(
                (fp) =>
                  personalities?.find((p) => p.id === fp.personality_id)?.name,
              )
              .filter(Boolean) || [],
          language: languageName, // 변환된 언어 이름을 추가
        };
      }),
    );

    console.log("Fonts with parsed data:", fontsWithParsedData);

    return (
      <main className="w-screen flex justify-center px-12 pb-16">
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
