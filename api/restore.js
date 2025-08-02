export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';

const REPLICATE_API_TOKEN = 'YOUR_REPLICATE_API_TOKEN'; // ganti dengan token milikmu

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { files } = await parseForm(req);
  const file = files.image;
  const fileData = fs.readFileSync(file.filepath);
  const base64 = fileData.toString('base64');

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: '9282f1c3c11c2c8d397c7a24d7d01fce56cefc2d78616c83a9f1fa378b6b1767',
      input: {
        image: `data:image/jpeg;base64,${base64}`,
        scale: 2,
        face_enhance: true,
      },
    }),
  });

  const result = await response.json();
  const predictionUrl = result.urls.get;

  let outputUrl = null;
  for (let i = 0; i < 10; i++) {
    const poll = await fetch(predictionUrl, {
      headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` },
    });
    const status = await poll.json();
    if (status.status === 'succeeded') {
      outputUrl = status.output;
      break;
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  if (!outputUrl) return res.status(500).json({ error: 'Restore gagal.' });
  res.status(200).json({ output_url: outputUrl });
}
