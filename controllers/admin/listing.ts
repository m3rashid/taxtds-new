import { Request, Response } from "express";

import Listing from "../../models/listing";
import User from "../../models/user";

export const deleteListing = async (req: Request, res: Response) => {
  const userId = req.user;
  if (!userId) throw new Error("UnAuthorized user");

  const serviceId = req.params.serviceId;
  if (!serviceId) throw new Error("Bad Request");

  const service = await Listing.findById(serviceId);
  if (!service) throw new Error("No Services Found");

  const user = await User.findById(service.addedBy);
  if (!user || user._id !== userId) throw new Error("UnAuthorized user");

  // TODO delete the service
};

export const featureUnfeatureListing = async (req: Request, res: Response) => {
  res.send("done");
};
