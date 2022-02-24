import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { login, register } from "./handlers/authUser";
import user from "./handlers/user";
import professionName from "./handlers/professionName";
import review from "./handlers/review";
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
    console.log("Mongoose is connected");
  } catch (err) {
    console.log(err);
  }
};

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await connect();

  // refactor the routes
  //  TODO add the rate limiters
  app.use("/user", /* authRateLimiter,*/ register);
  app.use("/user", /* authRateLimiter,*/ login);
  app.use("/user", /* regularRateLimiter,*/ user);
  app.use("/profession-name", /*regularRateLimiter,*/ professionName);
  app.use("/review", /*regularRateLimiter,*/ review);
  app.use("/service", /* authRateLimiter,*/ addService);
  app.use("/service", /* authRateLimiter,*/ editService);
  app.use("/service", /* authRateLimiter,*/ removeService);
  app.use("/service-name", /*authRateLimiter,*/ serviceName);

  app.all("*", (req: Request, res: Response) => {
    res.status(200).json({
      message: "This page does not exist",
    });
  });

  console.log(`Server ready on: http://localhost:${port}`);
});
