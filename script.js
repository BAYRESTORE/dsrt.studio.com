const uploadInput = document.getElementById('uploadInput');
const restoreButton = document.getElementById('restoreButton');
const resultContainer = document.getElementById('resultContainer');
const sliderContainer = document.getElementById('sliderContainer');
const watermarkURL = 'https://cacwogekvnrrmmnjtmql.supabase.co/storage/v1/object/public/restore//file_00000000b41061f796a38f3d9fb3a9ae.png';

let originalImage = '';
let restoredImage = '';

// 🧮 Hitung jumlah restore dari localStorage
function getRestoreCount() {
  return parseInt(localStorage.getItem('restoreCount') || '0');
}
function incrementRestoreCount() {
  const count = getRestoreCount() + 1;
  localStorage.setItem('restoreCount', count.toString());
}

// 🧼 Hapus watermark
function removeWatermark() {
  const watermark = document.getElementById('dsrtWatermark');
  if (watermark) {
    watermark.style.opacity = 0;
    setTimeout(() => watermark.remove(), 300);
  }
}

// 📤 Upload Gambar
uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      originalImage = reader.result;
      document.getElementById('preview').src = originalImage;
    };
    reader.readAsDataURL(file);
  }
});

// 🚀 Mulai Restore
restoreButton.addEventListener('click', async () => {
  if (!originalImage) return alert("Silakan unggah gambar terlebih dahulu.");
  restoreButton.disabled = true;
  restoreButton.innerText = 'Memproses...';

  try {
    const res = await fetch('/api/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: originalImage })
    });

    const data = await res.json();
    if (data?.image) {
      restoredImage = data.image;
      incrementRestoreCount();
      showResult();
    } else {
      alert("Gagal memulihkan gambar.");
    }
  } catch (err) {
    alert("Terjadi kesalahan saat restore.");
    console.error(err);
  }

  restoreButton.disabled = false;
  restoreButton.innerText = 'Mulai Restore';
});

// 🎚️ Tampilkan Before–After
function showResult() {
  const restoreCount = getRestoreCount();

  sliderContainer.innerHTML = `
    <div class="slider-wrapper">
      <div class="before">
        <img src="${originalImage}" />
      </div>
      <div class="after">
        <img id="restoredImage" src="${restoredImage}" />
        ${restoreCount > 3 ? `
          <div class="blur-overlay"></div>
          <img src="lock-icon.png" class="lock-icon" />
        ` : `
          <img src="${watermarkURL}" id="dsrtWatermark" class="watermark" />
          <button class="remove-watermark" onclick="removeWatermark()">X</button>
        `}
      </div>
      <input type="range" min="0" max="100" value="50" class="slider" id="sliderRange" />
    </div>
    ${restoreCount <= 3 ? `
      <div class="download-buttons">
        <button onclick="downloadImage(512)">Unduh 512px</button>
        <button onclick="downloadImage(1024)">Unduh 1024px</button>
        <button onclick="window.print()">Cetak</button>
      </div>
    ` : ''}
  `;

  const rangeInput = document.getElementById('sliderRange');
  const before = sliderContainer.querySelector('.before');
  rangeInput.addEventListener('input', () => {
    before.style.width = `${100 - rangeInput.value}%`;
  });
}

// 💾 Unduh Gambar
function downloadImage(size) {
  const link = document.createElement('a');
  link.href = restoredImage;
  link.download = `restored-${size}.jpg`;
  link.click();
}
