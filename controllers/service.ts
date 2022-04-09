import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

import Listing from "../models/listing";
import User from "../models/user";
import Service from "../models/service";
import Profession from "../models/profession";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

export const remove = async (req: Request, res: Response) => {
  await Listing.findByIdAndUpdate(req.params.serviceId, {
    $set: { deleted: true },
  });
  return res.status(200).json({
    message: "Service removed successfully",
  });
};

// some are old and some are new, check usage

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

export const addService = async (req: Request, res: Response) => {
  const service = new Service({ name: req.body.name });
  await service.save();
  res.sendStatus(200);
};

export const addProfession = async (req: Request, res: Response) => {
  const { name } = req.body;
  // TODO check if the same name exists in the database or not
  const profession = new Profession({ name });
  await profession.save();
  res.send("reached");
};

export const addReview = async (Req: Request, res: Response) => {
  res.send("reached");
};
