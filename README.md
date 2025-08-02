# DSRT Studio – AI Photo Restoration Platform

**DSRT Studio** adalah platform restorasi foto AI dengan tingkat akurasi tinggi, dirancang untuk mempertahankan identitas wajah dan detail latar belakang secara utuh.

🌐 Website: [dsrt-studio-com.vercel.app](https://dsrt-studio-com.vercel.app)

---

## 🚀 Fitur Utama

- 🖼️ **Slider Before–After**: Bandingkan foto asli dan hasil restore secara visual.
- 🎨 **Restore Otomatis dengan AI**: Menggunakan Real-ESRGAN dan CodeFormer.
- 🔓 **3x Gratis Tanpa Login**: Bisa langsung digunakan tanpa registrasi.
- 💧 **Watermark & Blur Otomatis**: Aktif otomatis setelah restore ke-4.
- 📦 **Supabase Storage**: Menyimpan dan menampilkan hasil dari Supabase.
- 🔒 **Keamanan Bintang 7**: Tanpa webhook, hanya serverless API. Tidak menyimpan data pribadi.

## 📂 Struktur Proyek

/public              # HTML statis /api/restore.js      # Serverless function: panggil Replicate API /script.js           # Frontend restore + watermark + counter /supabase.js         # Koneksi ke Supabase /LICENSE             # Lisensi MIT /README.md           # Dokumentasi proyek ini

## 🛡️ Security

- ❌ Deteksi otomatis NSFW (AI filter).
- 🔐 Restore ke-4+ diberi blur dan watermark transparan penuh.
- 🧼 Tidak menyimpan data pribadi pengguna.
- 🚫 Tidak ada login untuk 3x gratis pertama.
- ☁️ Semua proses via serverless API — tanpa webhook.

## 📜 Lisensi

MIT License © 2025 DSRT Studio

> Kamu bebas menggunakan, memodifikasi, dan menyebarluaskan proyek ini untuk tujuan apapun, selama menyertakan atribusi kepada pembuat aslinya.  
> Lihat bagian berikut ini untuk isi lengkap lisensinya.

---

## 📄 LICENSE

MIT License

Copyright (c) 2025 DSRT Studio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
