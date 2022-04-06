import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import serverLogger from "./utils/serverLogger";

import logger from "./utils/logger";

const app = express();
app.use(cors());
app.use(express.json());
app.use(serverLogger);

// Global error handler
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  logger.error(err);
  return res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

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
