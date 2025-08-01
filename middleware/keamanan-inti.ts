// keamanan-inti.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Konfigurasi Supabase
const supabase = createClient(
  'https://cacwogekvnrrmmnjtmql.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY3dvZ2Vrdm5ycm1tbmp0bXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMjIzODUsImV4cCI6MjA2OTU5ODM4NX0.tgGrAt8ARa9KCsfx77OxFK3GOyaNozDX1qPs1uRnUbw'
);

// Daftar IP mencurigakan (optional, bisa pakai Supabase table)
const ipBlacklist = [
  '123.45.67.89', // contoh IP terblokir
];

// Middleware utama keamanan inti
export async function middleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';

  // 🔐 1. Cek IP blacklist
  if (ipBlacklist.includes(ip)) {
    return NextResponse.json({ error: 'Akses diblokir oleh sistem keamanan DSRT.' }, { status: 403 });
  }

  // 🔐 2. Batasi akses API per IP (rate limiter sederhana)
  const key = `rate-limit-${ip}`;
  const { data, error } = await supabase
    .from('log_keamanan')
    .select('*')
    .eq('ip', ip)
    .gte('timestamp', Date.now() - 10 * 1000);

  if (data && data.length >= 10) {
    return NextResponse.json({ error: 'Terlalu banyak permintaan, coba lagi nanti.' }, { status: 429 });
  }

  // 🔐 3. Simpan log permintaan IP
  await supabase.from('log_keamanan').insert({
    ip: ip,
    timestamp: Date.now(),
    path: req.nextUrl.pathname,
    agent: req.headers.get('user-agent') || 'unknown',
  });

  return NextResponse.next();
}
