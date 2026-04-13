import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    const data = await redis.lrange('responses', 0, -1);

    const parsed = data.map(item => {
      if (typeof item === "string") {
        try {
          return JSON.parse(item);
        } catch {
          return { error: "Bad string", raw: item };
        }
      }
      return item;
    });

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}