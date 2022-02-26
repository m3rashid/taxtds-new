import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import { invalidData, resourceAbsent } from "../helpers";
import User from "../../models/user";
import { issueJWT } from "../../middlewares/jwt";
import { comparePassword } from "../../utils/auth";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLoginRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await loginSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    console.log(err);
    return resourceAbsent(res);
  }
};

router.post(
  "/login",
  validateLoginRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const newUser = await User.findOne({ email });
      if (!newUser) {
        return resourceAbsent(res);
      }
      const match = await comparePassword(password, newUser.password);
      if (!match) {
        return invalidData(res);
      }
      const { token, expires } = issueJWT(newUser);
      return res.status(200).json({ token, expires, user: newUser });
    } catch (err) {
      console.log(err);
      return resourceAbsent(res);
    }
  }
);

export default router;
