import { Request, Response } from "express";

import Listing from "../../models/listing";
import { clearHash, useCache } from "../../utils/newCache";
import { paginationConfig } from "../helpers";

export const deleteListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;

  // TODO delete the listing images from cloudinary also
  await Listing.deleteOne({ _id: listingId });
  clearHash("listings");
  return res.status(200).json({ message: "Deleted listing successfully" });
};

export const removeRecoverListing = async (req: Request, res: Response) => {
  const { listingId, toRemove } = req.body;
  await Listing.findByIdAndUpdate(listingId, { $set: { deleted: toRemove } });
  clearHash("listings");
  return res.status(200).json({ message: "Recover listing successfully" });
};

export const getAllListingsAdmin = async (req: Request, res: Response) => {
  const { page, limit } = paginationConfig(req);
  const query = Listing.find()
    .sort({ createdAt: "desc" })
    .skip(page * limit)
    .limit(limit);

  const listings = await useCache("listings", query);
  return res.status(200).json({ listings });
};

export const featureUnfeatureListing = async (req: Request, res: Response) => {
  const { listingId, toFeature } = req.body;
  await Listing.findOneAndUpdate(
    { _id: listingId },
    { $set: { featured: toFeature } }
  );
  clearHash("listings");
  return res.status(200).json({
    message: `Listing ${toFeature ? "featured" : "unfeatured"} successfully`,
  });
};
