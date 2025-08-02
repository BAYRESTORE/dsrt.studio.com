---

📁 Struktur Folder

DSRT-Studio/
├── index.html             # Landing page
├── restore.html           # Halaman AI Restore
├── manual.html            # Halaman Manual Restore (photoshop, editing, dll)
├── api/
│   └── restore.js         # Serverless backend Real-ESRGAN via Replicate
├── public/
│   └── script.js          # Logic restore, slider, watermark, dll
├── assets/
│   ├── logo/              # Logo, favicon, spanduk, banner, neonbox
│   └── watermark/         # Gambar watermark DSRT transparan dari Supabase
├── .gitignore
├── LICENSE
└── README.md


---

✅ README.md (Final)

# DSRT STUDIO – AI RESTORASI FOTO

**DSRT Studio** adalah platform restorasi foto otomatis berbasis AI (Real-ESRGAN & CodeFormer), dan juga menyediakan layanan **manual retouching** untuk hasil yang lebih presisi.  
Cocok untuk memperbaiki foto lama, rusak, blur, atau berwarna kusam — dengan menjaga bentuk wajah, warna asli, dan detail utuh.

---

## 🔧 Fitur Utama

- ✅ Restore otomatis tanpa login (3x gratis)
- ✅ Slider before-after interaktif (desktop & mobile)
- ✅ Watermark DSRT transparan otomatis
- ✅ Efek blur + ikon gembok setelah restore ke-4
- ✅ Tombol download dan cetak berbagai resolusi
- ✅ Backend serverless (Vercel + Replicate)
- ✅ Penyimpanan watermark di Supabase
- ✅ Tidak mengubah bentuk wajah & latar asli
- ✅ Versi manual editing untuk hasil premium

---

## 🧰 Tools Manual

Kami juga menyediakan layanan **manual retouching** oleh editor profesional:  
- Pemulihan warna artistik
- Retouch wajah, pencahayaan, noise, tone
- Restore baju, latar, detail kompleks
- Bisa request spanduk, logo, neonbox, dll

---

## ⚙️ Cara Deploy

### 1. Vercel Setup
- Buat akun Vercel, hubungkan repo GitHub kamu
- Pastikan `api/restore.js` dikenali sebagai serverless function

### 2. Replicate API Key
Tambahkan di **Vercel → Project Settings → Environment Variables**:

| Name                 | Value                        |
|----------------------|------------------------------|
| `REPLICATE_API_TOKEN` | (isi token kamu)             |

### 3. Supabase Bucket untuk Watermark
Gunakan Supabase sebagai storage gambar:  
Simpan watermark transparan DSRT di folder `restore/`.

Contoh URL watermark transparan:

https://cacwogekvnrrmmnjtmql.supabase.co/storage/v1/object/public/restore/file_00000000b41061f796a38f3d9fb3a9ae.png

---

## 📁 Struktur Folder

Lihat file dan folder yang disarankan pada repositori ini:

- `index.html` – Halaman landing
- `restore.html` – Halaman utama AI restore
- `manual.html` – Halaman info layanan manual
- `api/restore.js` – Backend AI restore (Real-ESRGAN)
- `public/script.js` – Logic restore, slider, watermark
- `assets/logo/` – Logo, spanduk, neonbox, dll
- `assets/watermark/` – Gambar watermark transparan

---

## 🧠 Teknologi Digunakan

- [Real-ESRGAN (Replicate)](https://replicate.com/sczhou/real-esrgan)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- Supabase (image storage)
- HTML, CSS, JS (tanpa framework)
- Slider before-after interaktif
- localStorage (untuk menghitung kuota gratis)
- Efek canvas + watermark + blur

---

## 👤 Target Pengguna

- Pengguna Facebook grup editing/restorasi
- Pemilik foto lama, keluarga, pernikahan, dsb.
- Fotografer pemula/pakar
- UMKM, desainer, cetak banner/logo/neonbox

---

## 🧾 Lisensi

Proyek ini menggunakan lisensi MIT (lihat file `LICENSE`).  
Untuk penggunaan komersial layanan manual, hubungi DSRT Studio langsung.

---

## 🙌 Kredit

> Dibuat dan dikembangkan oleh **DSRT**  
> 🇮🇩 Indonesia – 2025

---

Terima kasih telah menggunakan DSRT Studio.  
**Silakan restore, unduh, atau hubungi kami untuk editing manual!**


---

✅ LICENSE (MIT)

Buat file LICENSE di root dan isi:

MIT License

Copyright (c) 2025 DSRT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


---

✅ .gitignore

Buat file .gitignore dan isi dengan:

# Node
node_modules/
npm-debug.log
.env

# OS
.DS_Store
Thumbs.db

# Vercel
.vercel

# Supabase & secrets
.supabase/
*.key
*.env

# Output
output/


---
