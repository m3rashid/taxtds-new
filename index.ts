import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import serverLogger from "./utils/serverLogger";

import { login, register, getUser } from "./handlers/authUser";
import user from "./handlers/user";
import professionName from "./handlers/professionName";
import review from "./handlers/review";
import logger from "./utils/logger";
// TOD merge all these into one (make better file structure)
import {
  addService,
  editService,
  removeService,
  serviceName,
} from "./handlers/service";

// import { authRateLimiter, regularRateLimiter } from "./utils/rateLimiters";

const app = express();
app.use(cors());
app.use(express.json());
app.use(serverLogger);

app.use("/user", /* authRateLimiter, */ register);
app.use("/user", /* authRateLimiter, */ login);
app.use("/user", /* authRateLimiter, */ getUser);
app.use("/user", /* regularRateLimiter, */ user);
app.use("/profession-name", /* regularRateLimiter,*/ professionName);
app.use("/review", /* regularRateLimiter, */ review);
app.use("/service", /* authRateLimiter, */ addService);
app.use("/service", /* authRateLimiter, */ editService);
app.use("/service", /* authRateLimiter, */ removeService);
app.use("/service-name", /* authRateLimiter, */ serviceName);

const connect = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect("mongodb://localhost/taxtds");
    } else {
      await mongoose.connect("mongodb://localhost/taxtds");
    }
    logger.info("Mongoose is connected");
  } catch (err) {
    logger.error(JSON.stringify(err));
  }
};

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await connect();
  logger.info(`Server ready on: http://localhost:${port}`);
});
