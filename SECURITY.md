# 🛡️ Keamanan di DSRT Studio

DSRT Studio berkomitmen terhadap keamanan tingkat tinggi ("bintang 7") dalam seluruh alur sistem, termasuk frontend, backend, dan penyimpanan data pengguna.

---

## 🔍 Validasi & Pemfilteran Konten

- Sistem akan **menolak gambar yang mengandung konten eksplisit NSFW**, khususnya wanita telanjang.
- Gambar pria bertelanjang dada diperbolehkan.
- Anak-anak yang tidak memakai baju diperbolehkan selama **tidak menampilkan alat kelamin secara eksplisit**.
- File dalam format selain gambar (misalnya `.zip`, `.exe`, `.js`) akan ditolak untuk mencegah potensi injeksi berbahaya.

---

## 🔐 Perlindungan Data & Identitas

- Seluruh proses restore dilakukan langsung di frontend tanpa menyimpan data pengguna (tanpa login untuk 3 restore pertama).
- Data gambar pengguna hanya diproses sementara dan tidak disimpan secara permanen di server.
- Identitas visual wajah dan elemen foto **tidak akan dimodifikasi secara signifikan**: dagu, ekspresi, alis, hidung, serta latar belakang tetap dijaga.

---

## 🎯 Fitur Pembatasan & Perlindungan Visual

- Pengguna mendapat **3x restore gratis**, setelah itu:
  - Gambar diberi watermark DSRT transparan secara menyeluruh.
  - Efek **blur setengah dan ikon gembok** diterapkan untuk menjaga nilai privasi dan keamanan visual.
- Sistem menggunakan `localStorage` untuk menyimpan jumlah restore tanpa login.

---

## 🧱 Proteksi Frontend & Serverless

- Semua permintaan ke serverless (`api/restore.js`) menggunakan validasi API token Replicate.
- Tidak ada file `.zip`, `.tar`, atau binary yang diproses di backend.
- Sistem aman dari injeksi script (XSS), pengiriman data palsu (CSRF), SSRF, dan abuse restore.
- Cek tambahan akan ditambahkan untuk mencegah **spam, brute force**, atau penggunaan otomatis oleh bot.

---

## 🚨 Laporkan Kerentanan

Jika Anda menemukan celah keamanan atau perilaku mencurigakan:

- 📧 Email: dsrt.restore@gmail.com
- 🔒 Harap beri detail teknis yang cukup agar kami dapat mereproduksi dan memperbaiki masalah dengan cepat.
- Kami sangat menghargai pelaporan bertanggung jawab dan akan mencantumkan nama Anda (jika diizinkan) di halaman apresiasi.

---

Terima kasih telah menjaga DSRT Studio tetap aman dan dipercaya!
