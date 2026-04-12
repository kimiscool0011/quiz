import { kv } from '@vercel/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default async function handler(req, res) {
  const pass = req.headers['x-admin-password'];

  if (pass !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const data = await kv.lrange('responses', 0, -1);
  const parsed = data.map(item => JSON.parse(item));

  res.json(parsed);
}