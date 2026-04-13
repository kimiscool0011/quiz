import { Redis } from "@upstash/redis";

export default async function handler(req, res) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const data = req.body;

  await redis.rpush("responses", JSON.stringify(data)); // ✅ FIXED

  res.json({ ok: true });
}
