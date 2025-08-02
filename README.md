# 🖼️ DSRT Studio – AI Photo Restore & Colorize Platform

**DSRT Studio** adalah platform restorasi foto berbasis AI yang dirancang untuk memperbaiki foto rusak, buram, atau hitam-putih menjadi tajam dan berwarna natural — sambil mempertahankan identitas wajah, emosi, dan seluruh elemen foto secara utuh.

> 🔗 Live: [https://dsrt-studio-com.vercel.app](https://dsrt-studio-com.vercel.app)

---

## ✨ Fitur Unggulan

- ✅ **Restore AI Otomatis** via Real-ESRGAN (dan CodeFormer mendatang)
- 🎚️ **Before–After Slider** dengan drag geser intuitif
- 🎨 **Colorize Foto BW/Sepia** (terjaga natural, tidak over-saturasi)
- 🔍 **Preservasi Detail Penuh**: wajah, tekstur, latar belakang, dan pola
- 🔐 **Keamanan Bintang 7** (validasi NSFW, blur, watermark)
- 📱 **Kompatibel Mobile/Android + Desktop**
- ⚡ **3x Restore Gratis** tanpa login

---

## 🧩 Teknologi yang Digunakan

| Layer       | Teknologi                                 |
|-------------|--------------------------------------------|
| Frontend    | HTML/CSS/JS Static, SliderJS              |
| Backend     | Serverless function di `api/restore.js`   |
| AI Model    | Real-ESRGAN via Replicate API             |
| Penyimpanan | Supabase (Bucket: `restore`)              |
| Hosting     | Vercel                                     |

---

## 📸 Cara Penggunaan

1. Kunjungi [dsrt-studio-com.vercel.app](https://dsrt-studio-com.vercel.app)
2. Unggah foto rusak
3. Klik tombol **"Mulai Restore"**
4. Hasil akan ditampilkan dalam gaya before–after
5. Untuk restore ke-4 ke atas, hasil akan:
   - Diberi watermark transparan penuh
   - Diblur setengah dengan ikon gembok
   - Diberi tombol unduh & cetak beresolusi berbeda

---

## 🛡️ Keamanan

- Validasi konten NSFW (wanita telanjang ditolak, pria shirtless dan anak-anak non eksplisit diperbolehkan)
- Restore dilakukan langsung di browser (tanpa upload permanen)
- Sistem blur & watermark otomatis untuk restore ke-4+
- Proteksi terhadap abuse, XSS, CSRF, SSRF
- Detail: [SECURITY.md](./SECURITY.md)

---

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas!  
Lihat panduan lengkap di: [CONTRIBUTING.md](./CONTRIBUTING.md)

### Format Commit:

- `feat:` Tambah fitur  
- `fix:` Perbaikan  
- `docs:` Dokumentasi  
- `refactor:` Reorganisasi kode  
- `style:` Format/komentar

---

## 🧪 Developer Notes

- Struktur file **tidak boleh diubah**
- Semua pemrosesan dilakukan via frontend/serverless (tanpa Node build system)
- Jangan kirim file `.zip`, `node_modules`, atau build
- Gunakan `localStorage` untuk sistem batas restore gratis
- Integrasi penuh dengan Supabase & Replicate

---

## 🗃️ Repositori Terkait

- **Frontend**: `index.html`, `menu.html`, `script.js`, `style.css`
- **Serverless Restore**: `api/restore.js`
- **Assets**: Supabase Storage (watermark & hasil restore)

---

## 🙏 Terima Kasih

Platform ini dibangun untuk membantu komunitas pengeditan foto, khususnya pengguna Facebook yang memiliki kenangan rusak.  
Terima kasih atas semua feedback & kontribusi!

> 📬 Kontak: dsrt.restore@gmail.com
