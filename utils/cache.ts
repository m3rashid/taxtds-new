import mongoose from "mongoose";
import { createClient } from "redis";
import util from "util";

import logger from "./logger";

const client = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});
client.on("error", (err) => {
  logger.error("Redis error " + JSON.stringify(err));
});
client.get = util.promisify(client.get).bind(client);

// @ts-ignore
mongoose.Query.prototype.cache = function () {
  // @ts-ignore
  this.useCache = true;
  return this;
};

const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = async function () {
  // @ts-ignore
  if (!this.useCache) {
    // @ts-ignore
    const result = await exec.apply(this, arguments);
    return result;
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      // @ts-ignore
      collection: this.mongooseCollection.name,
    })
  );
  const cacheValue = await client.get(key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
};
