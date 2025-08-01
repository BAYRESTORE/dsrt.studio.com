// File: api/keamanan-pusat.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    "https://cacwogekvnrrmmnjtmql.supabase.co", // Ganti jika nanti domain berubah
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY3dvZ2Vrdm5ycm1tbmp0bXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMjIzODUsImV4cCI6MjA2OTU5ODM4NX0.tgGrAt8ARa9KCsfx77OxFK3GOyaNozDX1qPs1uRnUbw"
  );

  // === KEAMANAN FILE ===
  const { data: files } = await supabase.storage
    .from("restore")
    .list("", { limit: 100 });

  const now = Date.now();
  const expired = files?.filter((f) => {
    const fileTime = new Date(f.created_at).getTime();
    return now - fileTime > 10 * 60 * 1000; // lebih dari 10 menit
  }) || [];

  for (const file of expired) {
    await supabase.storage.from("restore").remove([file.name]);
  }

  // === SISTEM ROLE SEDERHANA ===
  const headers = Object.fromEntries(req.headers);
  const email = headers["x-user-email"] || "";

  let userRole = "anon"; // default gratis
  if (email && email.endsWith("@premium.com")) {
    userRole = "premium"; // simulasi deteksi role
  }

  // === FITUR TAMBAHAN KEAMANAN ===
  const screenshotProtection = true;
  const watermarkDefault = userRole === "anon";

  return new Response(
    JSON.stringify({
      status: "active",
      autoDelete: true,
      deletedFiles: expired.length,
      userRole,
      screenshotProtection,
      watermarkDefault
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
});
