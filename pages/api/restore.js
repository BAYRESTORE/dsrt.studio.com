export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const replicateRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "9286b1e0b4757068c06387403d9399c34f6990ec048c8d4df25362c0bfa25b10",
        input: {
          image: image,
          scale: 2,
          face_enhance: true,
        },
      }),
    });

    const prediction = await replicateRes.json();

    if (!prediction.output || prediction.output.length === 0) {
      return res.status(500).json({ error: "No output from model" });
    }

    // Ambil hasil restore, biasanya array output, ambil yang pertama
    const restoredUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;

    res.status(200).json({ restored: restoredUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
