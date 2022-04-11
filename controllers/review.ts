import { Request, Response } from "express";

import Review from "../models/review";

export const addReview = async (req: Request, res: Response) => {
  const { name, rating, review, listingId } = req.body;
  const newReview = new Review({
    name,
    rating,
    review,
    listing: listingId,
  });
  const savedReview = await newReview.save();
  return res.status(200).json({ savedReview, message: "Added review successfully" });
};
