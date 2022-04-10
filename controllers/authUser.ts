import { Response, Request } from "express";

import { issueJWT } from "../middlewares/jwt";
import Otp from "../models/otp";
import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";
import logger from "../utils/logger";
// import "../utils/cache";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (!oldUser) throw new Error("User not found");

  const match = await comparePassword(password, oldUser.password);
  if (!match) throw new Error("Credentials Invalid");

  const { token, expires } = issueJWT(oldUser);
  return res.status(200).json({ token, expires, user: oldUser });
};

export const register = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new Error("Already Present");

  let otpToSend: number;
  let emailToSend: string;
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
  logger.info(JSON.stringify({ emailToSend, otpToSend }));
  return res.sendStatus(200);
};

export const createAccount = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const dbOtp = await Otp.findOne({ email, otp });
  logger.info(JSON.stringify({ dbOtp, otp: parseInt(otp) }));
  if (!dbOtp || parseInt(otp) !== dbOtp.otp) throw new Error("Invalid OTP");

  const user = await User.findOne({ email });
  if (user) throw new Error("Resource Already Present");

  const hash: string = await hashPassword(req.body.password);
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
};
