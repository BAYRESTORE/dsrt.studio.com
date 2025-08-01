// File: keamanan-pusat.js
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: files } = await supabase.storage
    .from("restore")
    .list("", { limit: 100 });

  const now = Date.now();
  const expired = files?.filter((f) => {
    const fileTime = new Date(f.created_at).getTime();
    return now - fileTime > 10 * 60 * 1000; // 10 menit
  }) || [];

  for (const file of expired) {
    await supabase.storage.from("restore").remove([file.name]);
  }

  return new Response(`🧹 ${expired.length} file lama dihapus.`, {
    status: 200,
  });
});
