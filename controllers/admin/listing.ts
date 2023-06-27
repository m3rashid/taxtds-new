import { Request, Response } from 'express';

import Review from '../../models/review';
import Listing from '../../models/listing';
import { paginationConfig } from '../helpers';
import { deleteFromCloudinary } from '../listing';

export const deleteListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;
  const listing = await Listing.findById(listingId);

  if (listing?.reviews && listing.reviews.length > 0) {
    for (let i = 0; i < listing?.reviews.length; i++) {
      await Review.deleteOne({ _id: listing?.reviews[i] });
    }
  }

  const ids = [listing?.avatar.public_id];
  listing?.gallery.forEach((g) => {
    ids.push(g.public_id);
  });

  for (let i = 0; i < ids.length; i++) {
    await deleteFromCloudinary(ids[i]);
  }
  await Listing.deleteOne({ _id: listingId });
  return res.status(200).json({ message: 'Deleted listing successfully' });
};

export const removeRecoverListing = async (req: Request, res: Response) => {
  const { listingId, toRemove } = req.body;
  await Listing.findByIdAndUpdate(listingId, { $set: { deleted: toRemove } });
  // TODO send mail to the user that their listing was updated
  return res.status(200).json({ message: 'Recover listing successfully' });
};

export const getAllListingsAdmin = async (req: Request, res: Response) => {
  const { page, limit } = paginationConfig(req);
  const listings = await Listing.find()
    .sort({ createdAt: 'desc' })
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
  // TODO send mail to the user that their listing was featured/un-featured
  return res.status(200).json({
    message: `Listing ${toFeature ? 'featured' : 'un-featured'} successfully`,
  });
};
