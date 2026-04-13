import { Redis } from "@vercel/kv";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const data = req.body;

  await redis.rpush("responses", JSON.stringify(data));

  res.json({ ok: true });
}
