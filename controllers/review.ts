import { Request, Response } from "express";

import Review from "../models/review";

export const addReview = async (req: Request, res: Response) => {
  const { name, rating, comment, listingId } = req.body;
  const review = new Review({
    name,
    rating,
    comment,
    listing: listingId,
  });
  const savedReview = await review.save();
  return res.status(200).json({
    savedReview,
    message: "Added review successfully",
  });
};
