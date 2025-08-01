// File: api/keamanan.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const token = req.headers.get("x-dsrt-token");

  // Blokir jika tidak ada token
  if (!token) {
    return new Response(JSON.stringify({ status: "unauthorized" }), {
      status: 401,
    });
  }

  // Cek validitas token Supabase Auth
  const { data: userData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !userData.user) {
    return new Response(JSON.stringify({ status: "invalid_token" }), {
      status: 403,
    });
  }

  const userId = userData.user.id;

  // Ambil data pengguna
  const { data: pengguna, error: dbError } = await supabase
    .from("pengguna")
    .select("status, sisa_restore")
    .eq("id", userId)
    .single();

  if (dbError || !pengguna) {
    return new Response(JSON.stringify({ status: "user_not_found" }), {
      status: 404,
    });
  }

  // === Keamanan Pusat ===
  if (pengguna.status === "premium") {
    return new Response(JSON.stringify({ status: "premium" }), { status: 200 });
  }

  if (pengguna.sisa_restore <= 0) {
    return new Response(JSON.stringify({ status: "limit_exceeded" }), { status: 200 });
  }

  // === Keamanan Inti: Auto-Delete Gambar Restore Setelah 10 Menit ===
  const { data: files } = await supabase.storage
    .from("restore")
    .list("", { limit: 100 });

  const now = Date.now();
  const expired = files?.filter((f) => {
    const fileTime = new Date(f.created_at).getTime();
    return now - fileTime > 10 * 60 * 1000;
  }) || [];

  for (const file of expired) {
    await supabase.storage.from("restore").remove([file.name]);
  }

  // === Output Final ===
  return new Response(
    JSON.stringify({
      status: "allowed",
      remaining: pengguna.sisa_restore,
      deleted_files: expired.length,
    }),
    { status: 200 }
  );
});
