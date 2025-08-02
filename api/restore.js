export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    console.log("Sending request to Replicate...");
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "928d54a5e1394b8fb9e3792017d86f3f84b2aa6dd454df1c00f6f9e6d31c01cf", // Real-ESRGAN
        input: { image },
      }),
    });

    const prediction = await response.json();
    console.log("Replicate response:", prediction);

    if (prediction.error) {
      return res.status(500).json({ error: prediction.error });
    }

    const predictionId = prediction.id;

    let output = null;
    while (!output) {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      const pollResult = await pollResponse.json();
      console.log("Polling result:", pollResult);

      if (pollResult.error) {
        return res.status(500).json({ error: pollResult.error });
      }

      if (pollResult.status === "succeeded") {
        output = pollResult.output;
        break;
      }

      if (pollResult.status === "failed") {
        return res.status(500).json({ error: "Restoration failed on Replicate." });
      }
    }

    return res.status(200).json({ output });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Something went wrong while restoring the image." });
  }
}
