import { Request, Response } from "express";

import User from "../../models/user";
import Review from "../../models/review";
import Listing from "../../models/listing";
import sendMail from "../../utils/nodemailer";
import { deleteFromCloudinary } from "../listing";
import { ICustomData } from "../../mailerTemplates";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: "USER" }).select([
    "-password",
    "-professions",
    "-updatedAt",
  ]);
  return res.status(200).json({ users });
};

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

  if (!user) throw new Error("User not found");
  const listings = await Listing.find({ addedBy: userId });

  const ids: any[] = [];
  listings.forEach((listing) => {
    ids.push(listing.avatar.public_id);
    listing.gallery.forEach((g) => {
      ids.push(g.public_id);
    });
  });

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].reviews && listings[i].reviews.length > 0) {
      for (let j = 0; j < listings[i].reviews.length; j++) {
        await Review.deleteOne({ _id: listings[i].reviews[j] });
      }
    }
  }

  for (let i = 0; i < ids.length; i++) {
    await deleteFromCloudinary(ids[i]);
  }

  for (let i = 0; i < listings.length; i++) {
    await Listing.deleteOne({ _id: listings[i]._id });
  }

  await User.deleteOne({ _id: userId });

  sendMail({
    emailId: user.email,
    subject: "Taxtds user deleted",
    textVersion: `Account deleted`,
    type: "DELETE_USER",
  });
  return res.status(200).json({ message: "User deleted successfully" });
};
