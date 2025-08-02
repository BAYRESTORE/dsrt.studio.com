---

# DSRT Studio – AI Photo Restoration Platform

**DSRT Studio** adalah platform AI restorasi foto otomatis dan manual untuk memperbaiki foto rusak, buram, atau hitam putih menjadi jernih, berwarna, dan natural. Dibangun dengan teknologi Real-ESRGAN, Supabase, dan Vercel – cocok untuk pengguna umum hingga profesional restorasi.

🌐 Website: [dsrt-studio-com.vercel.app](https://dsrt-studio-com.vercel.app)

---

## 🚀 Fitur Utama

- 🔁 **Slider Before–After**: Bandingkan foto asli & hasil restore secara visual.
- 🎨 **Restore Otomatis dengan AI**: Perbaikan resolusi dan warna alami.
- 📷 **Dukung Foto Hitam-Putih & Rusak**: Deteksi wajah dan latar belakang secara cerdas.
- 🆓 **3x Restore Gratis Tanpa Login**: Setelah itu diberi watermark & efek blur.
- 🖼️ **Watermark Transparan Otomatis**: Menggunakan DSRT logo dari Supabase.
- 🔒 **Keamanan Tinggi (Bintang 7)**: Anti-spam, NSFW filter, dan tanpa data pengguna disimpan.
- 📤 **Unduh & Cetak**: Hasil bisa disimpan dalam berbagai resolusi.
- 📁 **Tanpa Login/Database Manual**: Full frontend + Supabase storage + serverless function.

---

## 🧠 Teknologi

- **Frontend**: HTML5, CSS3, JavaScript (vanilla), slider interaktif.
- **Backend**: Serverless function (`/api/restore.js`) di Vercel.
- **AI**: Real-ESRGAN (via Replicate API).
- **Storage**: Supabase bucket (public restore).
- **Hosting**: Vercel (`dsrt-studio-com.vercel.app`).
- **Keamanan**: NSFW detection, blur + watermark di restore ke-4+.

---

## ⚙️ Cara Deploy

### 1. Setup di Vercel
- Buat akun Vercel dan hubungkan repo GitHub kamu.
- Pastikan `api/restore.js` dikenali sebagai serverless function.

### 2. Tambahkan Replicate API Key
Masukkan ke **Vercel → Project Settings → Environment Variables**:

| Name                  | Value                    |
|-----------------------|--------------------------|
| `REPLICATE_API_TOKEN` | (isi token kamu di sini) |

### 3. Supabase Bucket untuk Watermark
Gunakan Supabase sebagai storage gambar.  
Simpan watermark transparan DSRT di folder `restore/`.

Contoh URL watermark transparan:

https://cacwogekvnrrmmnjtmql.supabase.co/storage/v1/object/public/restore//file_00000000b41061f796a38f3d9fb3a9ae.png

---

## 📁 Struktur Folder

```bash
/
├── index.html         # Landing page
├── menu.html          # Halaman utama upload + restore
├── restore.html       # Halaman untuk restorasi manual
├── script.js          # Restore logic + slider + watermarking
├── api/
│   └── restore.js     # Serverless function: Real-ESRGAN
├── .gitignore
├── README.md
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md


---

🛠️ Kontribusi

Ingin bantu proyek ini? Silakan baca CONTRIBUTING.md untuk panduan lengkap berkontribusi.
Kontribusi dalam bentuk kode, saran, atau bug report sangat kami apresiasi!


---

🔐 Keamanan

Kami mematuhi standar keamanan tinggi (“bintang 7”), termasuk:

Tidak menyimpan informasi pribadi pengguna

Filter konten NSFW (wanita telanjang ditolak, anak-anak disensor)

Restore ke-4+ diberi watermark penuh + efek blur

Validasi jenis file, serta akses Supabase publik & terbatas


📖 Baca lebih lanjut di SECURITY.md


---

📄 Dokumen Tambahan

📜 LICENSE – MIT

🛠️ Panduan Kontribusi

🔐 Kebijakan Keamanan



---
