<style>
  .slider-wrapper {
    position: relative;
    max-width: 100%;
    overflow: hidden;
    margin-top: 20px;
  }

  .slider {
    position: relative;
    display: flex;
    height: auto;
  }

  .slider-img {
    width: 100%;
    display: block;
    user-select: none;
  }

  .slider-res {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  .slider-res img.after {
    position: absolute;
    top: 0;
    left: 0;
  }

  .watermark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0.5;
    pointer-events: none;
  }

  .remove-watermark {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(255,255,255,0.8);
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 2px 6px;
    z-index: 10;
  }

  .locked {
    filter: blur(4px);
  }

  .lock-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    color: white;
    z-index: 5;
  }
</style>

<script>
  const restoreLimit = 3;
  const localKey = 'restore_count';
  const watermarkURL = "https://cacwogekvnrrmmnjtmql.supabase.co/storage/v1/object/public/restore//file_00000000b41061f796a38f3d9fb3a9ae.png";
  const lockIcon = "🔒";

  document.addEventListener("DOMContentLoaded", () => {
    const uploadInput = document.getElementById("upload");
    const restoreButton = document.getElementById("restore-btn");
    const previewContainer = document.getElementById("preview-container");

    let originalImage = null;

    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        originalImage = reader.result;
        showPreview(originalImage);
      };
      reader.readAsDataURL(file);
    });

    restoreButton.addEventListener("click", async () => {
      if (!originalImage) {
        alert("Silakan unggah gambar terlebih dahulu.");
        return;
      }

      const count = parseInt(localStorage.getItem(localKey)) || 0;
      const formData = { image: originalImage };

      restoreButton.disabled = true;
      restoreButton.innerText = "Memproses...";

      try {
        const res = await fetch("/api/restore", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data?.output) {
          let restoredUrl = data.output;

          if (count < restoreLimit) {
            showResult(originalImage, restoredUrl, false, true);
            localStorage.setItem(localKey, count + 1);
          } else {
            showResult(originalImage, restoredUrl, true, true);
          }
        } else {
          alert("Gagal memproses gambar.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan.");
      }

      restoreButton.disabled = false;
      restoreButton.innerText = "Mulai Restore";
    });

    function showPreview(src) {
      previewContainer.innerHTML = `<img src="${src}" class="preview-original" />`;
    }

    function showResult(original, restored, locked = false, withWatermark = false) {
      previewContainer.innerHTML = `
        <div class="slider-wrapper">
          <div class="slider">
            <img src="${original}" class="slider-img before" />
            <div class="slider-res">
              <img src="${restored}" class="slider-img after ${locked ? 'locked' : ''}" />
              ${locked ? `<div class="lock-icon">${lockIcon}</div>` : ''}
              ${withWatermark ? `<img src="${watermarkURL}" class="watermark" />` : ''}
              ${!locked && withWatermark ? `<button id="remove-watermark" class="remove-watermark">✕</button>` : ''}
            </div>
          </div>
        </div>
      `;

      setupSlider();

      if (document.getElementById("remove-watermark")) {
        document.getElementById("remove-watermark").addEventListener("click", () => {
          document.querySelector(".watermark").style.opacity = "0";
          document.getElementById("remove-watermark").style.display = "none";
        });
      }
    }

    function setupSlider() {
      const wrapper = document.querySelector(".slider-wrapper");
      const slider = wrapper.querySelector(".slider");
      const resImg = slider.querySelector(".slider-res");
      let isDown = false;

      wrapper.addEventListener("mousedown", (e) => {
        isDown = true;
        moveSlider(e);
      });

      wrapper.addEventListener("mouseup", () => {
        isDown = false;
      });

      wrapper.addEventListener("mousemove", (e) => {
        if (isDown) moveSlider(e);
      });

      function moveSlider(e) {
        const bounds = slider.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        if (x < 0) x = 0;
        if (x > bounds.width) x = bounds.width;
        resImg.style.width = `${x}px`;
      }

      resImg.style.width = "50%";
    }
  });
</script>
