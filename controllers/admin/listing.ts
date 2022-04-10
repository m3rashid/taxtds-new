import { Request, Response } from "express";

import Listing from "../../models/listing";
import { clearHash } from "../../utils/cache";

export const deleteListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;

  await Listing.deleteOne({ _id: listingId });
  clearHash("listings");
  return res.status(200).json({ message: "Deleted listing successfully" });
};

export const featureUnfeatureListing = async (req: Request, res: Response) => {
  const { listingId, toFeature } = req.body;
  const updatedListing = await Listing.findOneAndUpdate(
    { _id: listingId },
    { $set: { featured: toFeature } }
  );
  clearHash("listings");
  return res.status(200).json({
    message: `Listing ${toFeature ? "featured" : "unfeatured"} successfully`,
    listing: updatedListing,
  });
};
