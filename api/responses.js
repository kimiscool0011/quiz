import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const data = await kv.lrange('responses', 0, -1);

    const parsed = data.map(item => {
      if (typeof item === "string") {
        try {
          return JSON.parse(item);
        } catch {
          return { error: "Bad string", raw: item };
        }
      }
      return item; // already object ✅
    });

    res.json(parsed);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}