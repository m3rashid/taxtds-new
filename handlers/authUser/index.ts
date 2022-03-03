import express, { Response } from "express";
const getUser = express.Router();

import login from "./login";
import register from "./register";
import { invalidData } from "../helpers";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
import User from "../../models/user";
import logger from "../../utils/logger";

getUser.get("/", checkAuth, async (req: SecureRequest, res: Response) => {
  const user = await User.findOne({ _id: req.user });
  if (!user) {
    logger.error(`User not found for id: ${req.user}`);
    return invalidData(res);
  }
  logger.info(`User found for id: ${req.user}`);
  return res.status(200).json({ user });
});

export { login, register, getUser };
