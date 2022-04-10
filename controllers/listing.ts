import { Request, Response } from "express";

import Listing from "../models/listing";
import User from "../models/user";

// const uploadFiles = async (file: Express.Multer.File) => {
//   try {
//     let filePath = path.resolve(__dirname, `../../uploads/${file.filename}`);
//     let data = await cloudinary.uploader.upload(filePath);
//     return data;
//   } catch (err) {
//     logger.error(JSON.stringify(err));
//   }
// };

export const addListing = async (req: Request, res: Response) => {
  // const { avatar, gallery } = req.body;
  const service = new Listing({
    brandName: req.body.brandName,
    // handle the image upload workflow
    // avatar,
    // gallery,
    services: req.body.services,
    addedBy: req.body.addedBy,
    established: req.body.established,
    tagline: req.body.tagline,
    owner: req.body.owner,
    addressLineOne: req.body.addressLineOne,
    addressLineTwo: req.body.addressLineTwo,
    state: req.body.state,
    phone: req.body.phone,
    email: req.body.email,
  });
  await service.save();
  return res.status(200).json({
    message: "Service added successfully",
    service,
  });
};

export const editListing = async (req: Request, res: Response) => {
  const user = await User.findById(req.user);
  if (!user) throw new Error("UnAuthorized user");

  const serviceId = req.params.serviceId;
  if (!serviceId) throw new Error("Bad Request");

  const service = await Listing.findById(serviceId);
  if (!service) throw new Error("No Services Found");
  // handle the image change workflow
  // const { avatar, gallery } = req.body;
  await Listing.findByIdAndUpdate(req.params.serviceId, {
    $set: {
      brandName: req.body.brandName,
      services: req.body.services,
      addedBy: req.body.addedBy,
      established: req.body.established,
      tagline: req.body.tagline,
      owner: req.body.owner,
      addressLineOne: req.body.addressLineOne,
      addressLineTwo: req.body.addressLineTwo,
      state: req.body.state,
      phone: req.body.phone,
      email: req.body.email,
    },
  });
  return res.status(200).json({
    message: "Service updated successfully",
  });
};

export const removeListing = async (req: Request, res: Response) => {
  await Listing.findByIdAndUpdate(req.params.serviceId, {
    $set: { deleted: true },
  });
  return res.status(200).json({
    message: "Service removed successfully",
  });
};

export const getOneListing = async (req: Request, res: Response) => {
  const userId = req.user;
  if (!userId) throw new Error("UnAuthorized user");

  const serviceId = req.params.serviceId;
  if (!serviceId) throw new Error("Bad Request");

  const service = await Listing.findOne({ _id: serviceId, deleted: false });
  if (!service) throw new Error("No service found");

  return res.status(200).json({
    service: service,
    message: "Service found",
  });
};
