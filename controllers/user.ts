import { Request, Response } from "express";

import { issueJWT } from "../middlewares/jwt";
import User from "../models/user";
import logger from "../utils/logger";

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.user });
  if (!user) throw new Error(`User not found for id: ${req.user}`);
  logger.info(`User found for id: ${req.user}`);

  const { token, expires } = issueJWT(user);
  return res.status(200).json({ token, expires, user });
};

export const getQuotes = async (Req: Request, res: Response) => {
  res.send("reached");
};
