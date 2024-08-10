// TODO: 에러 페이지에 관한 조사 및 개발

import { createClient } from "@/utils/supabase/server";

import FontSearchBar from "@/components/FontSearchBar";
import FontPreviewCard from "@/components/FontPreviewCard";
import { FontPreviewSettingBar } from "@/components/FontPreviewSettingBar";

// https://v0.dev/t/b3cxIEIZ6xm

export default async function Fonts() {
  const supabase = createClient();
  const { data: fonts } = await supabase.from("fonts").select();

  return (
    <>
      {/* <pre>{JSON.stringify(fonts, null, 2)}</pre> */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-red">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Font Preview</h1>
          <FontPreviewSettingBar />
          <FontSearchBar />
        </div>
        <div className="flex flex-col gap-4">
          {fonts.map((font) => (
            <FontPreviewCard
              key={font.id}
              name={font.name}
              authors={font.author}
            />
          ))}
        </div>
      </div>
    </>
  );
}
