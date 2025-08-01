// /api/keamanan-pusat.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Inisialisasi Supabase
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  const { pathname } = new URL(req.url);
  const ua = req.headers.get("user-agent") || "";
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  // 💥 Anti Bot & Headless
  const botPatterns = ["curl", "bot", "python", "axios", "scrapy", "headless"];
  const isBot = botPatterns.some((bot) => ua.toLowerCase().includes(bot));

  // 🔐 Validasi user login (dummy check - bisa dikembangkan)
  const token = req.headers.get("x-dsrt-token");
  const isAuthenticated = !!token && token.length > 20;

  // 🛡️ Rate limit dasar (per IP / fitur / hari - dummy contoh)
  const now = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  const limitKey = `limit-${ip}-${pathname}-${now}`;
  const { data: logData } = await supabase.from("keamanan").select("*").eq("key", limitKey).single();

  if (!logData) {
    await supabase.from("keamanan").insert({ key: limitKey, jumlah: 1 });
  } else if (logData.jumlah >= 5) {
    return new Response(JSON.stringify({ status: "limit", ip }), { status: 429 });
  } else {
    await supabase.from("keamanan").update({ jumlah: logData.jumlah + 1 }).eq("key", limitKey);
  }

  // ❌ Blok jika bot
  if (isBot) {
    return new Response(JSON.stringify({ status: "blocked", reason: "Bot Detected" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ Akses aman
  return new Response(JSON.stringify({
    status: "ok",
    ip,
    login: isAuthenticated,
    agent: ua
  }), {
    headers: { "Content-Type": "application/json" }
  });
});
