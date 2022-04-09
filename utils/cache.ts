// import mongoose from "mongoose";
// import { createClient } from "redis";

// import logger from "./logger";

// const client = createClient({
//   url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
// });

// const exec = mongoose.Query.prototype.exec;

// mongoose.Query.prototype.exec = async function () {
//   logger.info(JSON.stringify(this.getQuery()));

//   if (!this.useCache) {
//     return exec.apply(this, args);
//   }

//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), {
//       // collection: add collection name here {figure it out}
//     })
//   );

//   const cachedValue = await client.get(key);
//   if (cachedValue) {
//     const doc = JSON.parse(cachedValue);
//     return Array.isArray(doc)
//       ? doc.map((d) => new this.model(d))
//       : new this.model(doc);
//   }

//   const result = await exec.apply(this, args);
//   await client.set(key, JSON.stringify(result), "EX", 10);
//   console.log(result);
// };

// mongoose.Query.prototype.cache  = function () {
//   this.useCache = true;
//   return this;
// };
