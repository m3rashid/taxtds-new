import { Response, Request } from "express";
import { HydratedDocument } from "mongoose";
import { ISendRegisterOtp, ISignupData } from "../mailerTemplates";

import logger from "../utils/logger";
import Listing from "../models/listing";
import Otp, { IOtp } from "../models/otp";
import sendMail from "../utils/nodemailer";
import User, { IUser } from "../models/user";
import { issueJWT } from "../middlewares/jwt";
import { comparePassword, hashPassword } from "../utils/auth";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, deleted: false });
  if (!user) throw new Error("User not found");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Credentials Invalid");

  let userListings: any = [];
  if (user.role === "USER") {
    userListings = await Listing.find({
      addedBy: user._id,
      deleted: false,
    })
      .select([
        "-addedBy",
        "-addressLineOne",
        "-addressLineTwo",
        "-createdAt",
        "-updatedAt",
        "-deleted",
        "-gallery",
        "-reviews",
        "-services",
      ])
      .lean();
  }

  const { token } = issueJWT(user);
  return res.status(200).json({ token, user, userListings });
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
    const dbOtp: HydratedDocument<IOtp> = new Otp({
      email,
      otp: Math.floor(100000 + Math.random() * 900000),
    });
    await dbOtp.save();
    otpToSend = dbOtp.otp;
    emailToSend = dbOtp.email;
  }
  // TODO test this
  sendMail({
    type: "SEND_REGISTER_OTP",
    emailId: emailToSend,
    subject: "OTP for refistration on Taxtds",
    textVersion: `your OTP: ${otpToSend}`,
    data: {
      email: emailToSend,
      otp: otpToSend,
    } as ISendRegisterOtp,
  });
  logger.info(JSON.stringify({ emailToSend, otpToSend }));
  return res.status(200).json({ message: "OTP sent to your email" });
};

export const createAccount = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const dbOtp = await Otp.findOne({ email, otp });
  logger.info(JSON.stringify({ dbOtp, otp: parseInt(otp) }));
  if (!dbOtp || parseInt(otp) !== dbOtp.otp) throw new Error("Invalid OTP");

  const hash: string = await hashPassword(req.body.password);
  const newUser: HydratedDocument<IUser> = new User({
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
  await Otp.deleteOne({ email });
  const { token } = issueJWT(newUser);
  // TODO test this
  sendMail({
    type: "SIGNUP",
    emailId: email,
    subject: "Successfully signed up on Taxtds",
    textVersion: `Successfully signed up on Taxtds as ${req.body.name} <${email}>`,
    data: {
      name: req.body.name,
      email: email,
    } as ISignupData,
  });
  return res.status(200).json({ token, user: newUser });
};
