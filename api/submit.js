import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const data = req.body;

  await kv.rpush("responses", JSON.stringify(data)); // ✅ ALWAYS stringify

  res.json({ ok: true });
}
