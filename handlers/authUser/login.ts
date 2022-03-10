import express from "express";
import Joi from "joi";
const router = express.Router();

import { invalidData, resourceAbsent } from "../helpers";
import User from "../../models/user";
import { issueJWT } from "../../middlewares/jwt";
import { comparePassword } from "../../utils/auth";
import logger from "../../utils/logger";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLoginRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const value = await loginSchema.validateAsync({ ...req.body });
    logger.debug(JSON.stringify(value));
    next();
  } catch (err) {
    logger.debug(JSON.stringify(err));
    return resourceAbsent(res);
  }
};

router.post(
  "/login",
  validateLoginRequest,
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    try {
      const newUser = await User.findOne({ email });
      if (!newUser) return resourceAbsent(res);

      const match = await comparePassword(password, newUser.password);
      if (!match) return invalidData(res);

      const { token, expires } = issueJWT(newUser);
      return res.status(200).json({ token, expires, user: newUser });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return resourceAbsent(res);
    }
  }
);

export default router;
