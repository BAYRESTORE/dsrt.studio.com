export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const image = req.body?.image;
  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const predictionResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "928d54a5e1394b8fb9e3792017d86f3f84b2aa6dd454df1c00f6f9e6d31c01cf", // Real-ESRGAN
        input: { image }
      })
    });

    const prediction = await predictionResponse.json();

    if (prediction?.error) {
      return res.status(500).json({ error: prediction.error });
    }

    const predictionId = prediction.id;

    // Polling status sampai selesai
    let output = null;
    let status = prediction.status;
    while (status !== "succeeded" && status !== "failed") {
      await new Promise(r => setTimeout(r, 1500)); // delay 1.5 detik

      const checkResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      });

      const checkResult = await checkResponse.json();
      status = checkResult.status;
      output = checkResult.output;

      if (status === "failed") {
        return res.status(500).json({ error: "Restore failed on Replicate side." });
      }
    }

    return res.status(200).json({ output });
  } catch (err) {
    console.error("Restore error:", err);
    return res.status(500).json({ error: "Failed to restore image" });
  }
}
