import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

import Listing, { Image, IListing } from "../models/listing";
import logger from "../utils/logger";
import { clearHash } from "../utils/cache";
import { paginationConfig } from "./helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadFiles = async (file: Express.Multer.File) => {
  let filePath = path.resolve(__dirname, `../uploads/${file.filename}`);
  let data = await cloudinary.uploader.upload(filePath);
  return data;
};

const removeFileFromServer = (filename: string) => {
  fs.unlink(path.resolve(__dirname, `../uploads/${filename}`), (err) => {
    if (err) logger.error(err);
  });
};

export const addListing = async (req: Request, res: Response) => {
  logger.info(JSON.stringify(req.body));
  // logger.info(JSON.stringify(req.));

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const avatar = files["avatar"][0];
  const galleryImgOne = files["galleryImgOne"][0];
  const galleryImgTwo = files["galleryImgTwo"][0];
  const galleryImgThree = files["galleryImgThree"][0];

  let gallery: Express.Multer.File[] = [];
  [galleryImgOne, galleryImgTwo, galleryImgThree].forEach((file) => {
    if (file) {
      gallery.push(file);
    }
  });

  const avatarUrl = await uploadFiles(avatar);
  let galleryUrls: Image[] = [];
  for (let i = 0; i < gallery.length; i++) {
    const fileUrl = await uploadFiles(gallery[i]);
    galleryUrls.push({ url: fileUrl.secure_url, public_id: fileUrl.public_id });
  }

  const listing: IListing = new Listing({
    brandName: req.body.brandName,
    avatar: { url: avatarUrl.secure_url, public_id: avatarUrl.public_id },
    gallery: galleryUrls,
    services: req.body.services,
    addedBy: req.user,
    established: req.body.established,
    tagline: req.body.tagline,
    owner: req.body.owner,
    addressLineOne: req.body.addressLineOne,
    addressLineTwo: req.body.addressLineTwo,
    state: req.body.state,
    phone: req.body.phone,
    email: req.body.email,
  });
  await listing.save();

  removeFileFromServer(avatar.filename);
  for (let i = 0; i < gallery.length; i++) {
    removeFileFromServer(gallery[i].filename);
  }

  clearHash("listings");
  return res.status(200).json({
    message: "Listing added successfully",
    listing,
  });
};

export const editListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;

  const listing = await Listing.findById(listingId);
  if (!listing || listing.addedBy !== req.user)
    throw new Error("No Services Found");
  // handle the image change workflow
  await Listing.findByIdAndUpdate(listingId, {
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
  clearHash("listings");
  return res.status(200).json({ message: "Listing updated successfully" });
};

export const removeListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;
  await Listing.findOneAndUpdate(
    { _id: listingId, addedBy: req.user },
    { $set: { deleted: true } }
  );
  clearHash("listings");
  return res.status(200).json({ message: "Listing removed successfully" });
};

export const getAllListings = async (req: Request, res: Response) => {
  const { page, limit } = paginationConfig(req);
  const listings = await Listing.find({ deleted: false })
    .sort({ createdAt: "desc" })
    .skip(page * limit)
    .limit(limit)
    .cache({ key: "listings" });
  return res.status(200).json({ listings });
};

export const getOneListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;
  const listing = await Listing.findOne({ _id: listingId, deleted: false })
    .populate("services", {
      path: "addedBy",
      populate: { path: "professions", model: "Profession" },
    })
    .cache();
  if (!listing) throw new Error("No listing found");
  return res.status(200).json({ listing });
};
