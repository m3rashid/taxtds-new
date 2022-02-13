import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import { resourceAbsent } from "./helpers";

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
    const value = await loginSchema.validateAsync({
      ...req.body,
    });
    // TODO validate according to its value
    console.log(value);
    next();
  } catch (err) {
    return resourceAbsent(res);
  }
};

router.post("/login", validateLoginRequest, (req: Request, res: Response) => {
  res.send("reached");
});

export default router;
