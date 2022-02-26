import express, { Response } from "express";
const getUser = express.Router();

import login from "./login";
import register from "./register";
import { invalidData } from "../helpers";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
import User from "../../models/user";

getUser.get("/", checkAuth, async (req: SecureRequest, res: Response) => {
  const user = await User.findOne({ _id: req.user });
  if (!user) {
    return invalidData(res);
  }
  return res.status(200).json({ user });
});

export { login, register, getUser };
