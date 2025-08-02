// File: api/restore.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const replicateApiToken = process.env.REPLICATE_API_TOKEN;
  if (!replicateApiToken) {
    return res.status(500).json({ error: 'Missing Replicate API token in environment variables' });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Image URL is required in request body' });
  }

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${replicateApiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: '928ef5edc0b9199e9c3d56dbb0b929be0f6c6b5e9d9fbf67ecf1c3b31c3f041e', // Real-ESRGAN model
        input: {
          img: image
        }
      })
    });

    const json = await response.json();

    if (json?.error) {
      return res.status(500).json({ error: json.error });
    }

    res.status(200).json(json);
  } catch (err) {
    console.error('Restore error:', err);
    res.status(500).json({ error: 'Something went wrong with restore request' });
  }
}
