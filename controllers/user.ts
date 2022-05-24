import { Request, Response } from "express";

import User from "../models/user";
import logger from "../utils/logger";
import { issueJWT } from "../middlewares/jwt";

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.user, deleted: false });
  if (!user) throw new Error(`User not found for id: ${req.user}`);
  logger.info(`User found for id: ${req.user}`);

  const { token } = issueJWT(user);
  return res.status(200).json({ token, user });
};

export const getQuotes = async (Req: Request, res: Response) => {
  // email to admin about this
  res.status(200).json({ message: "Quotes" });
};
