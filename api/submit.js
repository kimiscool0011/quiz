import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const data = req.body;

  await kv.rpush('responses', JSON.stringify(data));

  res.json({ ok: true });
}