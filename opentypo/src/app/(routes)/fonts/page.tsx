import { createClient } from "@/utils/supabase/server";

export default async function Fonts() {
  const supabase = createClient();
  const { data: fonts } = await supabase.from("fonts").select();

  return <pre>{JSON.stringify(fonts, null, 2)}</pre>;
}
