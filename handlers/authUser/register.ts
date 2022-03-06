import express from "express";
import Joi from "joi";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

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
import logger from "../../utils/logger";
import upload from "../../utils/multer";

const router = express.Router();

const registerOneSchema = Joi.object({
  email: Joi.string().email().required(),
});

const validateRegisterOneRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await registerOneSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    logger.error(JSON.stringify(err));
    return notFound(res);
  }
};

router.post(
  "/register-one",
  validateRegisterOneRequest,
  async (req: express.Request, res: express.Response) => {
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
      logger.info(emailToSend, otpToSend);
      return res.sendStatus(200);
    } catch (err) {
      logger.error(JSON.stringify(err));
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
  avatar: Joi.binary(),
  professions: Joi.array().items(Joi.string()),
  password: Joi.string(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

const validateRegisterTwoRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const value = await registerTwoSchema.validateAsync({ ...req.body });
    console.log(value);
    next();
  } catch (err) {
    console.log(err);
    return notFound(res);
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

router.post(
  "/register-two",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  validateRegisterTwoRequest,
  async (req: express.Request, res: express.Response) => {
    const { email, otp } = req.body;
    try {
      const dbOtp = await Otp.findOne({ email, otp });
      logger.info({ dbOtp, otp: parseInt(otp) });
      if (!dbOtp || parseInt(otp) !== dbOtp.otp) {
        return invalidData(res);
      }
      const user = await User.findOne({ email });
      if (user) {
        return alreadyPresent(res);
      }
      const hash = await hashPassword(req.body.password);
      const newUser = new User({
        email,
        name: req.body.name,
        phone: req.body.phone,
        experience: req.body.experience,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        state: req.body.state,
        professions: req.body.professions,
        password: hash,
      });
      await newUser.save();
      const { token, expires } = issueJWT(newUser);
      return res.status(200).json({ token, expires, user: newUser });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return internalServerError(res);
    }
  }
);

export default router;
