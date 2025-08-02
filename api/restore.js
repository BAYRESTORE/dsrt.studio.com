const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const parsedBody = JSON.parse(body);
      const image = parsedBody?.image;

      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
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

      const prediction = await replicateResponse.json();
      return res.status(200).json(prediction);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};
