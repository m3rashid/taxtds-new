import Listing from "../models/listing";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { IReviewData } from "../mailerTemplates";

import sendMail from "../utils/nodemailer";
import Review, { IReview } from "../models/review";

export const addReview = async (req: Request, res: Response) => {
  const { name, rating, review, listingId } = req.body;
  const newReview: HydratedDocument<IReview> = new Review({
    name,
    rating,
    review,
    listing: listingId,
  });
  const savedReview = await newReview.save();
  const listing = await Listing.findByIdAndUpdate(
    { _id: listingId },
    { $push: { reviews: savedReview._id } }
  );
  sendMail({
    emailId: listing?.email || "",
    subject: "Someone posted a review on your listing",
    type: "REVIEW",
    textVersion: `New review on your listing by ${name}, who rated ${rating} stars and posted "${review}"`,
    data: {
      commentedBy: name,
      rating: rating,
      review: review,
    } as IReviewData,
  });
  return res.status(200).json({
    savedReview,
    message: "Added review successfully",
  });
};
