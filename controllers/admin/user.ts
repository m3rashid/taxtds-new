import { Request, Response } from "express";
import { ICustomData } from "../../mailerTemplates";
import User from "../../models/user";
import sendMail from "../../utils/nodemailer";

export const emailUser = async (req: Request, res: Response) => {
  const { emailId, name, subject, message } = req.body;
  // send mail
  sendMail({
    emailId: emailId,
    subject: subject,
    type: "CUSTOM",
    textVersion: ``,
    data: {
      name: name,
      content: message,
      email: emailId,
    } as ICustomData,
  });
  return res.status(200).json({ message: "successful" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  // also delete all posts related to user
  // also delete the cloudinary images of those posts
  if (!user) throw new Error("User not found");
  sendMail({
    emailId: user.email,
    subject: "Taxtds user deleted",
    textVersion: `Account deleted`,
    type: "DELETE_USER",
  });
  await User.findByIdAndDelete(userId);
  return res.status(200).json({ message: "User deleted successfully" });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: "USER" }).select([
    "-password",
    "-professions",
    "-updatedAt",
  ]);
  return res.status(200).json({ users });
};
