import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import serverLogger from "./utils/serverLogger";
import logger from "./utils/logger";
import routes from "./routes";
import adminRoutes from "./adminRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serverLogger);
app.use(routes);
app.use("/admin", adminRoutes);

// Global error handler
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  logger.error(JSON.stringify(err));
  return res.status(500).json({
    message: JSON.stringify(err.message) || "Internal Server Error",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    if (process.env.NODE_ENV === "production")
      await mongoose.connect("mongodb://localhost/taxtds");
    else await mongoose.connect("mongodb://localhost/taxtds");
    logger.info("Mongoose is connected");
  } catch (err) {
    logger.error(JSON.stringify(err));
    process.exit(1);
  }
  logger.info(`Server ready on: http://localhost:${port}`);
});
