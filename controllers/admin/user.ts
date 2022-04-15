import { Request, Response } from "express";
import User from "../../models/user";

export const emailUser = async (req: Request, res: Response) => {
  const { emailId, name, subject, message } = req.body;
  // send mail
  return res.status(200).json({ message: "successful" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  // also delete all posts related to user
  // also delete the cloudinary images of those posts
  await User.findByIdAndDelete(userId);
  return res.status(200).json({ message: "User deleted successfully" });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).json({ users });
};
