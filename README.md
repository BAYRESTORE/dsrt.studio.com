---

  

DSRT STUDIO – AI RESTORASI FOTO

DSRT Studio adalah platform restorasi dan peningkatan foto berbasis AI yang memperbaiki gambar rusak, buram, atau kuno tanpa mengubah identitas wajah dan menjaga warna natural.
Dibangun secara mandiri oleh DSRT, platform ini menggabungkan teknologi Real-ESRGAN dan CodeFormer serta sistem serverless modern yang ringan dan cepat.


---

🎯 Fitur Unggulan

🔓 Restore otomatis tanpa login (3x gratis per device)

🔁 Slider before–after interaktif

💧 Watermark DSRT transparan otomatis

🔒 Efek blur & ikon gembok setelah restore ke-4

⚡ Serverless backend (api/restore.js via Vercel)

🧠 AI Engine: Real-ESRGAN (Replicate)

💡 Frontend: HTML, CSS, JavaScript (tanpa framework)

📱 Desain responsive untuk mobile & desktop



---

🧰 Struktur Proyek

.
├── index.html          # Halaman utama (landing page)
├── restore.html        # Halaman restore AI otomatis
├── api/
│   └── restore.js      # Serverless backend (Vercel)
├── public/
│   └── script.js       # Logic restore, slider, watermark, dsb
├── /manual/
│   └── manual.html     # Halaman layanan restore manual & cetak
├── README.md           # Dokumentasi proyek (ini)


---

⚙️ Cara Deploy

1. Vercel Setup

Buat akun di vercel.com, hubungkan repo GitHub kamu

Pastikan file api/restore.js dikenali sebagai serverless function


2. Replicate API Token

Tambahkan di Vercel → Project Settings → Environment Variables:

Name	Value

REPLICATE_API_TOKEN	(masukkan token Replicate kamu)


> Token didapat dari: https://replicate.com/account



3. Supabase (Untuk Gambar Watermark)

Buat akun di supabase.com

Upload watermark DSRT (format transparan PNG) ke bucket bernama restore/

Simpan URL public watermark seperti ini:


https://your-project.supabase.co/storage/v1/object/public/restore/namafile.png

> URL ini nanti dipakai di script.js untuk menambahkan watermark pada hasil restore.




---

💼 Layanan Tambahan (Manual)

DSRT Studio juga menyediakan halaman khusus untuk:

✏️ Restore manual (oleh editor manusia)

🖨️ Cetak & desain fisik: banner, neonbox, undangan, dan spanduk

📥 Form request custom desain langsung dari website


> Tersedia di: /manual/manual.html (bisa disesuaikan)




---

👤 Target Pengguna

Anggota grup Facebook restorasi/editing foto

Pemilik foto keluarga lama yang rusak/buram

Desainer yang ingin cetak hasil restorasi

Siapa saja yang ingin coba AI enhancer gratis



---

🚀 Roadmap (Tahapan Pengembangan)

[x] Restore AI Real-ESRGAN

[x] Slider Before–After

[x] Sistem 3x gratis dengan localStorage

[x] Efek blur dan watermark DSRT otomatis

[x] Unduh/cetak hasil berbagai resolusi

[ ] Integrasi CodeFormer (peningkatan wajah)

[ ] Notifikasi hasil restore selesai

[ ] User dashboard login Supabase (opsional)

[ ] Riwayat restore tersimpan



---

🧠 Teknologi yang Digunakan

Komponen	Teknologi

AI Engine	Real-ESRGAN (Replicate)
Serverless	Vercel Functions
Penyimpanan	Supabase Storage
Frontend	HTML, CSS, JavaScript
Penghitung batas	localStorage JS



---

📄 Lisensi

Open-source untuk keperluan edukasi dan non-komersial.
Untuk kolaborasi, izin komersial, atau integrasi profesional, silakan hubungi DSRT langsung.


---

🙌 Kredit

> Dibangun secara mandiri oleh DSRT 🇮🇩
Dirancang untuk masyarakat yang ingin menghidupkan kembali kenangan lewat foto.




---

🌐 Demo Live

> 💻 https://dsrt-studio-com.vercel.app
⚙️ Backend API




---

Terima kasih telah menggunakan DSRT Studio!
Silakan fork, gunakan, dan kembangkan sesuai kebutuhan 🙏


---
