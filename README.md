# DSRT STUDIO – AI RESTORE FOTO

**DSRT Studio** adalah platform restorasi foto otomatis berbasis AI menggunakan model Real-ESRGAN & CodeFormer.  
Cocok untuk memperbaiki foto rusak, buram, atau lama — dengan hasil yang tetap menjaga identitas asli wajah dan warna natural.

---

## 🔧 Fitur Unggulan

- ✅ Restore otomatis tanpa login (3x kesempatan gratis)
- ✅ Slider before-after interaktif
- ✅ Watermark DSRT transparan otomatis
- ✅ Efek blur & gembok setelah restore ke-4
- ✅ Backend serverless (Vercel `api/restore.js`)
- ✅ Pemanggilan API Real-ESRGAN via Replicate
- ✅ Responsive untuk desktop & mobile

---

## 🗂️ Struktur Folder

. ├── index.html          # Landing page ├── restore.html        # Halaman restore utama ├── api/ │   └── restore.js      # Serverless backend (Vercel) ├── public/ │   └── script.js       # Logic restore, slider, watermark, dll ├── README.md           # Dokumentasi proyek

---

## ⚙️ Setup & Konfigurasi

### 1. Deploy ke Vercel
- Pastikan kamu sudah punya akun Vercel.
- Hubungkan dengan GitHub repo ini.
- Pastikan folder `api/restore.js` dikenali sebagai serverless function.

### 2. Tambahkan API Token Replicate
Di dashboard Vercel → *Project Settings* → *Environment Variables*:

| Name                 | Value                        |
|----------------------|------------------------------|
| `REPLICATE_API_TOKEN` | (isi dengan token milikmu)  |

### 3. Cek Supabase (untuk watermark)
- Gunakan Supabase URL & anon key kamu sendiri.
- Gambar watermark transparan disimpan di bucket `restore/` dengan URL seperti ini:

https://cacwogekvnrrmmnjtmql.supabase.co/storage/v1/object/public/restore//file_00000000b41061f796a38f3d9fb3a9ae.png

> ⚠️ Untuk hasil restore ke-4 ke atas: gambar akan diblur setengah, diberi gembok, dan watermark DSRT memenuhi gambar.

---

## 🧠 Teknologi yang Digunakan

- [Real-ESRGAN (Replicate)](https://replicate.com/sczhou/real-esrgan)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- Supabase (untuk storage watermark)
- HTML, CSS, JS (tanpa framework)
- Slider JS before-after custom
- localStorage (untuk hitung restore gratis)

---

## 👥 Target Pengguna

- Pengguna Facebook grup editing/restorasi
- Fotografer atau pemilik foto lama rusak
- Siapa pun yang ingin coba AI photo enhancer secara instan

---

## 📄 Lisensi

Open-source for educational and non-commercial use.  
Hubungi DSRT Studio untuk lisensi komersial atau kolaborasi.

---

## 🙌 Kredit

> Dikembangkan mandiri oleh DSRT RMSTER  
> 🇮🇩 Indonesia

---

Terima kasih telah menggunakan DSRT Studio.  
**Selamat mencoba!**


---
