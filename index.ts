import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";

import register from "./handlers/auth.register";
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

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connect();
  app.get("/", (req: any, res: any) => {
    res.send("hello");
  });
  app.use("/user", authRateLimiter, register);
  console.log(`Server on: http://localhost:${port}`);
});
