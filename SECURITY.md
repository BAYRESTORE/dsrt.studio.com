# 🛡️ SECURITY.md – Keamanan DSRT Studio

Terima kasih atas minat Anda terhadap keamanan DSRT Studio.

Platform ini dibangun dengan prioritas utama pada **privasi, integritas, dan keamanan pengguna**, terutama karena berhubungan dengan data visual (foto pribadi) yang sensitif.

---

## 🔐 Kebijakan Keamanan

### 1. Privasi Pengguna
- Kami **tidak menyimpan foto pengguna** secara permanen. Semua file dihapus otomatis dari Supabase setelah pemrosesan selesai atau setelah waktu tertentu (jika berlaku).
- Tidak ada sistem login wajib untuk 3x restore gratis. Kami tidak mengumpulkan data personal seperti email atau nomor HP secara default.

### 2. Perlindungan Data
- Semua file yang diproses hanya disimpan sementara di **Supabase Storage Bucket** dengan akses publik terbatas.
- Tidak ada file yang dibagikan ke pihak ketiga.

### 3. Kontrol Konten NSFW
- Sistem deteksi otomatis akan **menolak pemrosesan gambar tidak pantas**, khususnya foto wanita telanjang atau eksplisit.
- Pria bertelanjang dada dan anak-anak tanpa baju diperbolehkan selama **tidak mengekspos alat kelamin secara eksplisit**.

### 4. Perlindungan Abuse & Spam
- Batasan restore gratis hanya 3 kali tanpa login.
- Setelah itu, sistem akan **menambahkan watermark + efek blur + ikon gembok** pada hasil, kecuali pengguna mengambil opsi restore manual atau berbayar (jika tersedia).

---

## 🧰 Teknologi yang Digunakan

- **Vercel Serverless Functions** – Tidak menyimpan file di server permanen.
- **Supabase** – Penyimpanan file sementara (bucket publik diawasi).
- **Replicate (Real-ESRGAN + CodeFormer)** – Dipanggil secara real-time tanpa cache permanen.

---

## 📣 Laporkan Kerentanan

Jika Anda menemukan celah keamanan, silakan laporkan segera ke:

📧 **dsrt.official71@gmail.com**

Kami berkomitmen untuk:
- Menanggapi laporan dalam **48 jam**
- Memperbaiki isu keamanan kritis dalam **7 hari kerja** (jika memungkinkan)

---

## 🤝 Transparansi

Kami mendukung prinsip keamanan terbuka (open security). Semua kode sumber tersedia secara publik dan dapat diaudit oleh siapa saja di GitHub.

---

Terima kasih atas perhatian dan bantuannya menjaga DSRT Studio tetap aman 💙
