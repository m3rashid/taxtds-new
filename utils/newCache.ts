import { createClient } from "redis";
import logger from "./logger";

const client = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});
client.connect();

const useCache = async (hashKey: string, query: any) => {
  const queryOptions = {
    model: query.model,
    options: {
      ...query.options,
      ...query._conditions,
    },
  };
  const cachedValue = await client.hGet(hashKey, JSON.stringify(queryOptions));

  if (cachedValue) {
    logger.info(`REDIS: Cache hit for ${hashKey}`);
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map((d) => new queryOptions.model(d))
      : new queryOptions.model(doc);
  }
  logger.info(`REDIS: Cache miss for ${hashKey}`);
  const result = await query;
  await client.hSet(
    hashKey,
    JSON.stringify(queryOptions),
    JSON.stringify(result)
  );
  return result;
};

const clearHash = (hashKey: string) => {
  client.del(hashKey);
};

export { clearHash, useCache, client as redisClient };
