import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import { internalServerError, notFound } from "./helpers";

const registerOneSchema = Joi.object({
  email: Joi.string().email().required(),
});

const validateRegisterOneRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await registerOneSchema.validateAsync({
      ...req.body,
    });
    console.log(value);
    next();
  } catch (err) {
    return notFound(res);
  }
};

router.post(
  "/register-one",
  validateRegisterOneRequest,
  async (req: Request, res: Response) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const { email } = req.body;
    console.log("reached");
    res.status(200).json({ email: email, otp: otp });
  }
);

const registerTwoSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(30).required(),
  otp: Joi.number().integer().min(0).max(999999).required(),
  password: Joi.string(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

const validateRegisterTwoRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await registerTwoSchema.validateAsync({
      ...req.body,
    });
    next();
  } catch (err) {
    return notFound(res);
  }
};

router.post(
  "/register-two",
  validateRegisterTwoRequest,
  async (req: Request, res: Response) => {
    res.send("reached");
  }
);

export default router;
