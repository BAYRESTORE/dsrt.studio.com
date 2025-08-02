// pages/api/restore.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "92860eaa24c9e5c857a54173f7c9b5743c62b6b8b2bee6a5c66a625a5dfb3cd2", // Real-ESRGAN 4x
        input: {
          image: image, // base64 or URL
          scale: 2,
          face_enhance: true,
        },
      }),
    });

    const result = await response.json();

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }

    // Polling sampai selesai
    let restoredImage = null;
    while (!restoredImage) {
      const poll = await fetch(result.urls.get, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });
      const pollResult = await poll.json();

      if (pollResult.status === "succeeded") {
        restoredImage = pollResult.output;
        break;
      } else if (pollResult.status === "failed") {
        return res.status(500).json({ error: "Restore failed." });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return res.status(200).json({ output: restoredImage });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
