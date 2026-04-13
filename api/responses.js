import { Redis } from "@upstash/redis";

export default async function handler(req, res) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // safety check
    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      return res.status(500).json({ error: "Missing Redis env variables" });
    }

    const data = await redis.lrange("responses", 0, -1);

    if (!data) {
      return res.json([]);
    }

    const parsed = data.map((item) => {
      try {
        if (typeof item === "string") {
          return JSON.parse(item);
        }
        return item; // already object
      } catch (e) {
        return { error: "Bad entry", raw: item };
      }
    });

    res.json(parsed);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
