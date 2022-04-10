import mongoose from "mongoose";
import redis from "redis";

import logger from "./logger";

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

const exec = mongoose.Query.prototype.exec;
type CacheOptions = { key?: string };

mongoose.Query.prototype.exec = async function () {
  logger.info(JSON.stringify(this.getQuery()));

  if (!this.useCache) {
    return exec.apply(this);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.model.collection.name,
  });

  const cachedValue = await client.hGet(this.hashKey, key);

  if (cachedValue) {
    logger.info(`REDIS: Returning cached value for ${key}`);
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this);
  await client.hSet(this.hashKey, key, JSON.stringify(result));
  logger.info(`REDIS: Returning fetched value from Database ${key}`);
  return result;
};

export const clearHash = function (hashKey: string) {
  client.del(JSON.stringify(hashKey));
};

mongoose.Query.prototype.cache = function (options: CacheOptions = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};
