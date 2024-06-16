import { createClient } from "@/utils/supabase/server";

import FontSearchBar from "@/components/FontSearchBar";
import FontPreviewCard from "@/components/FontPreviewCard"

// https://v0.dev/t/b3cxIEIZ6xm

export default async function Fonts() {
  const supabase = createClient();
  const { data: fonts } = await supabase.from("fonts").select();

  return (
    <>
      <pre>{JSON.stringify(fonts, null, 2)}</pre>
      <div className="max-w-7xl mx-auto px-4 py-8 bg-red">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Font Preview</h1>
          <FontSearchBar />
        </div>
        <div>
          <FontPreviewCard/>
        </div>
      </div>
    </>
  );
}
