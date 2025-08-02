// api/restore.js
export default async function handler(req, res) {
  const image = req.body?.image;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
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

    const result = await response.json();

    if (result?.error) {
      return res.status(500).json({ error: result.error });
    }

    return res.status(200).json({ output: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to restore image" });
  }
}
