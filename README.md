DSRT Studio – AI Photo Restoration Platform

DSRT Studio adalah platform restorasi foto AI dengan tingkat akurasi tinggi, dirancang untuk mempertahankan identitas wajah dan detail latar belakang secara utuh.

🌐 Website: dsrt-studio-com.vercel.app
📧 Email: dsrt.official71@gmail.com
📸 Instagram: @dsrt.official.2025


---

🚀 Fitur Utama

🖼️ Slider Before–After: Bandingkan foto asli dan hasil restore secara visual.

🎨 Restore Otomatis dengan AI: Menggunakan Real-ESRGAN dan CodeFormer (via Replicate API).

🔓 3x Gratis Tanpa Login: Bisa langsung digunakan tanpa registrasi.

💧 Watermark & Blur Otomatis: Aktif otomatis setelah restore ke-4.

📦 Supabase Storage: Menyimpan dan menampilkan hasil dari Supabase bucket.

🔒 Keamanan Bintang 7: Tanpa webhook, tanpa penyimpanan data pribadi pengguna.



---

📂 Struktur Proyek

/public              # HTML statis (menu.html, index.html)  
/api/restore.js      # Serverless function panggil Replicate (Real-ESRGAN)  
/script.js           # Restore logic + slider + watermark + counter  
/supabase.js         # Koneksi frontend ke Supabase Storage  
/README.md           # Dokumentasi proyek ini  
/LICENSE             # Lisensi MIT  
  
  
---  
  
🛡️ Keamanan  
  
❌ Deteksi otomatis konten NSFW (AI filter terintegrasi).  
  
🔐 Restore ke-4+ otomatis diberi watermark DSRT + blur + ikon gembok.  
  
🧼 Tidak menyimpan data pribadi pengguna.  
  
🚫 Tidak ada login selama masa gratis digunakan.  
  
☁️ Semua proses melalui serverless function — tanpa webhook.  
  
  
  
---  
  
⚙️ Teknologi Digunakan  
  
Frontend: HTML statis, JavaScript, Supabase Storage.  
  
Backend: Serverless API (api/restore.js) – Vercel.  
  
AI Model: Real-ESRGAN + CodeFormer via Replicate API.  
  
Hosting: Vercel (Static Deployment).  
  
Storage: Supabase Bucket (restore).  
  
  
  
---  
  
🧪 Cara Penggunaan  
  
1. Buka dsrt-studio-com.vercel.app.  
  
  
2. Unggah foto rusak melalui halaman Restore Otomatis.  
  
  
3. Klik tombol "Mulai Restore".  
  
  
4. Bandingkan hasilnya di slider Before–After.  
  
  
5. Jika baru pertama kali, kamu bisa restore gratis sampai 3 kali.  
  
  
6. Setelah itu, hasil akan diberi watermark & blur.  
  
  
  
  
---  
  
📜 Lisensi  
  
MIT License © 2025 DSRT Studio  
  
> Kamu bebas menggunakan, memodifikasi, dan menyebarluaskan proyek ini untuk tujuan apapun, selama menyertakan atribusi kepada pembuat aslinya.  
  
  
  
Isi Lisensi:  
  
MIT License  
  
Copyright (c) 2025 DSRT Studio  
  
Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.  
  
  
---  
  
🤝 Kontribusi  
  
Pull Request sangat disambut.  
Silakan fork repo ini, lakukan perubahanmu, dan kirim PR.  
  
  
---  
  
Developed with ❤️ by DSRT Studio
