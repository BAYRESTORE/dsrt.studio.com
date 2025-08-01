// /api/keamanan-pusat.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: files, error: listError } = await supabase.storage
    .from("restore")
    .list("", { limit: 100 });

  if (listError) {
    return new Response(`Gagal mengambil daftar file: ${listError.message}`, {
      status: 500,
    });
  }

  const now = Date.now();
  const expired = files?.filter((file) => {
    const fileTime = new Date(file.created_at).getTime();
    return now - fileTime > 10 * 60 * 1000; // >10 menit
  }) || [];

  for (const file of expired) {
    await supabase.storage.from("restore").remove([file.name]);
  }

  return new Response(`🧹 ${expired.length} file kadaluarsa berhasil dihapus.`, {
    status: 200,
  });
});
