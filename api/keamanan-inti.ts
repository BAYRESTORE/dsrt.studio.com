// /api/keamanan-inti.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  const ua = req.headers.get("user-agent") || "";
  const referer = req.headers.get("referer") || "";
  const origin = req.headers.get("origin") || "";

  const allowedDomain = "dsrt-studio.vercel.app";
  const blacklistedAgents = ["curl", "wget", "bot", "python", "axios", "scrapy", "headless"];

  const isBot = blacklistedAgents.some(agent =>
    ua.toLowerCase().includes(agent)
  );

  const isValidReferer = referer.includes(allowedDomain) || origin.includes(allowedDomain);

  if (isBot || !isValidReferer) {
    return new Response(JSON.stringify({
      status: "blocked",
      reason: isBot ? "Bot/Script terdeteksi" : "Domain tidak sah"
    }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "Content-Type": "application/json" }
  });
});
