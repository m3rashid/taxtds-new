import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import winston from "winston";
import expressWinston from "express-winston";

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

import { authRateLimiter, regularRateLimiter } from "./utils/rateLimiters";

const connect = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      // TODO add a production database string here
      await mongoose.connect("mongodb://localhost/taxtds");
    } else {
      await mongoose.connect("mongodb://localhost/taxtds");
    }
    logger.info("Mongoose is connected");
  } catch (err) {
    logger.error(JSON.stringify(err));
  }
};

const app = express();
app.use(cors());
app.use(express.json());

const colorizer = winston.format.colorize();
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.align(),
      winston.format.printf((info) => {
        return `${info.timestamp} :: [${colorizer.colorize(
          info.level,
          info.level.toUpperCase()
        )}] ${info.message}\n[${colorizer.colorize(
          info.level,
          "RESPONSE"
        )}]:: ${JSON.stringify(info.meta.res)}\n`;
      })
    ),
    meta: true,
    expressFormat: true,
    colorize: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await connect();

  app.use("/user", /* authRateLimiter,*/ register);
  app.use("/user", /* authRateLimiter,*/ login);
  app.use("/user", /* authRateLimiter,*/ getUser);
  app.use("/user", /* regularRateLimiter,*/ user);
  app.use("/profession-name", /*regularRateLimiter,*/ professionName);
  app.use("/review", /*regularRateLimiter,*/ review);
  app.use("/service", /* authRateLimiter,*/ addService);
  app.use("/service", /* authRateLimiter,*/ editService);
  app.use("/service", /* authRateLimiter,*/ removeService);
  app.use("/service-name", /*authRateLimiter,*/ serviceName);

  logger.info(`Server ready on: http://localhost:${port}`);
});
