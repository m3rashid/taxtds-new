import { Request, Response } from "express";

import Listing from "../../models/listing";
import { paginationConfig } from "../helpers";

export const deleteListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;

  // TODO delete the listing images from cloudinary also
  await Listing.deleteOne({ _id: listingId });
  return res.status(200).json({ message: "Deleted listing successfully" });
};

export const removeRecoverListing = async (req: Request, res: Response) => {
  const { listingId, toRemove } = req.body;
  await Listing.findByIdAndUpdate(listingId, { $set: { deleted: toRemove } });
  // TODO send mail to the user that their listing was updated
  return res.status(200).json({ message: "Recover listing successfully" });
};

export const getAllListingsAdmin = async (req: Request, res: Response) => {
  const { page, limit } = paginationConfig(req);
  const listings = await Listing.find()
    .sort({ createdAt: "desc" })
    .skip(page * limit)
    .limit(limit);

  return res.status(200).json({ listings });
};

export const featureUnfeatureListing = async (req: Request, res: Response) => {
  const { listingId, toFeature } = req.body;
  const listing = await Listing.findOneAndUpdate(
    { _id: listingId },
    { $set: { featured: toFeature } }
  );
  // TODO send mail to the user that their listing was featured/unfeatured
  return res.status(200).json({
    message: `Listing ${toFeature ? "featured" : "unfeatured"} successfully`,
  });
};
