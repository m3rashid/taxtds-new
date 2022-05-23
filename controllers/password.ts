import { Response, Request } from "express";

import Otp, { IOtp } from "../models/otp";
import User from "../models/user";
import logger from "../utils/logger";
import { comparePassword, hashPassword } from "../utils/auth";
import { HydratedDocument } from "mongoose";
import sendMail from "../utils/nodemailer";
import { IForgotData } from "../mailerTemplates";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email, deleted: false });
  if (!user) throw new Error("User not found");

  let otpToSend: number;
  const savedOtp = await Otp.findOne({ email });
  if (savedOtp) otpToSend = savedOtp.otp;
  else {
    const dbOtp: HydratedDocument<IOtp> = new Otp({
      email,
      otp: Math.floor(100000 + Math.random() * 900000),
    });
    await dbOtp.save();
    otpToSend = dbOtp.otp;
  }
  // TODO this is incomplete
  sendMail({
    emailId: email,
    subject: "Use this OTP to reset your password",
    type: "FORGOT_PASSWORD",
    textVersion: `Your OTP: ${otpToSend}`,
    data: {
      otp: otpToSend,
    } as IForgotData,
  });
  logger.info(JSON.stringify({ email, otpToSend }));
  return res.status(200).json({ message: "OTP sent to your email" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const dbOtp = await Otp.findOne({ email, otp });
  logger.info(JSON.stringify({ dbOtp, otp: parseInt(otp) }));
  if (!dbOtp || parseInt(otp) !== dbOtp.otp) throw new Error("Invalid OTP");

  const hash: string = await hashPassword(req.body.password);
  await User.findOneAndUpdate(
    { email, deleted: false },
    { $set: { password: hash } }
  );

  return res.status(200).json({ message: "Password reset successfully" });
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findOne({ _id: req.user, deleted: false });
  if (!user) throw new Error("User not found");

  const match = await comparePassword(oldPassword, user.password);
  if (!match) throw new Error("Credentials Invalid");

  const hash: string = await hashPassword(newPassword);
  await User.findOneAndUpdate({ _id: req.user }, { $set: { password: hash } });

  return res.status(200).json({ message: "Password reset successfully" });
};

export const updateUserInfo = async (req: Request, res: Response) => {
  const { updates, password } = req.body;

  const user = await User.findOne({ _id: req.user, deleted: false });
  if (!user) throw new Error("User not found");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Credentials Invalid");

  await User.findOneAndUpdate({ _id: req.user }, { $set: { ...updates } });

  return res.status(200).json({ message: "Info changed successfully" });
};
