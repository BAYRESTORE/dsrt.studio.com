document.getElementById("restoreBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("upload");
  const file = fileInput.files[0];
  if (!file) {
    alert("Pilih gambar terlebih dahulu.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result;

    try {
      const res = await fetch("/api/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await res.json();
      if (data.output) {
        document.getElementById("result").innerHTML =
          `<p>Hasil Restore:</p><img src="${data.output}" style="max-width:100%;border:1px solid #ccc"/>`;
      } else {
        alert("Restore gagal: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat proses restore.");
    }
  };

  reader.readAsDataURL(file);
});
