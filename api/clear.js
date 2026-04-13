// api/clear.js
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  await kv.del("responses");
  res.json({ cleared: true });
}
