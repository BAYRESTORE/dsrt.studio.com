// keamanan-pusat.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://cacwogekvnrrmmnjtmql.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY3dvZ2Vrdm5ycm1tbmp0bXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMjIzODUsImV4cCI6MjA2OTU5ODM4NX0.tgGrAt8ARa9KCsfx77OxFK3GOyaNozDX1qPs1uRnUbw'
);

export async function keamananPusat(fitur) {
  const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
  if (!user) {
    alert("❌ Anda belum login.");
    window.location.href = "index.html";
    return { status: false };
  }

  const email = user.email;

  // Ambil status akun user
  const { data: profile, error } = await supabase
    .from('users')
    .select('is_premium, quota_left')
    .eq('email', email)
    .single();

  if (error || !profile) {
    alert("⚠️ Gagal cek status akun.");
    return { status: false };
  }

  if (!profile.is_premium) {
    if (profile.quota_left <= 0) {
      alert("⛔ Kuota gratis habis. Silakan upgrade.");
      return { status: false };
    }

    // Potong kuota pakai fungsi Supabase SQL
    await supabase.rpc('kurangi_kuota', { email_input: email });
  }

  return {
    status: true,
    premium: profile.is_premium,
    fitur: fitur
  };
}  if (dbError || !pengguna) {
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
