import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import {
  internalServerError,
  notFound,
  alreadyPresent,
  invalidData,
} from "../helpers";
import Otp from "../../models/otp";
import User from "../../models/user";
import { hashPassword } from "../../utils/auth";
import { issueJWT } from "../../middlewares/jwt";

const registerOneSchema = Joi.object({
  email: Joi.string().email().required(),
});

const validateRegisterOneRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await registerOneSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    console.log(err);
    return notFound(res);
  }
};

router.post(
  "/register-one",
  validateRegisterOneRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return alreadyPresent(res);
      }
      let otpToSend: number, emailToSend: string;
      const savedOtp = await Otp.findOne({ email });
      if (savedOtp) {
        otpToSend = savedOtp.otp;
        emailToSend = savedOtp.email;
      } else {
        const dbOtp = new Otp({
          email,
          otp: Math.floor(100000 + Math.random() * 900000),
        });
        await dbOtp.save();
        otpToSend = dbOtp.otp;
        emailToSend = dbOtp.email;
      }
      // TODO send mail to the user with the OTP
      console.log(emailToSend, otpToSend);
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return internalServerError(res);
    }
  }
);

const registerTwoSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(30).required(),
  otp: Joi.number().integer().min(0).max(999999).required(),
  phone: Joi.string().required(),
  experience: Joi.number().min(0).max(100),
  addressLineOne: Joi.string().min(3).max(50).required(),
  addressLineTwo: Joi.string().min(3).max(50).allow(""),
  state: Joi.string().min(3).max(30).required(),
  // get avatar from some secure source
  avatar: Joi.binary().encoding("base64"),
  professions: Joi.array().items(Joi.string()),
  password: Joi.string(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

const validateRegisterTwoRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await registerTwoSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    console.log(err);
    return notFound(res);
  }
};

router.post(
  "/register-two",
  validateRegisterTwoRequest,
  async (req: Request, res: Response) => {
    const {
      email,
      name,
      otp,
      phone,
      experience,
      addressLineOne,
      addressLineTwo,
      state,
      professions,
      password,
    } = req.body;
    try {
      const dbOtp = await Otp.findOne({ email, otp });
      console.log({ dbOtp, otp: parseInt(otp) });
      if (!dbOtp || parseInt(otp) !== dbOtp.otp) {
        return invalidData(res);
      }
      const user = await User.findOne({ email });
      if (user) {
        return alreadyPresent(res);
      }
      const hash = await hashPassword(password);
      const newUser = new User({
        email,
        name,
        phone,
        experience,
        addressLineOne,
        addressLineTwo,
        state,
        professions,
        password: hash,
      });
      await newUser.save();
      const { token, expires } = issueJWT(newUser);
      res.status(200).json({ token, expires, user: newUser });
    } catch (err) {
      console.log(err);
      return internalServerError(res);
    }
  }
);

export default router;
