import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { HydratedDocument } from "mongoose";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import Listing, { Image, IListing } from "../models/listing";
import { clearHash, useCache } from "../utils/newCache";
import { paginationConfig } from "./helpers";
import Review from "../models/review";
import logger from "../utils/logger";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryInitial = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`;

const uploadFiles = async (file: Express.Multer.File) => {
  let filePath = path.resolve(__dirname, `../uploads/resized/${file.filename}`);
  await sharp(file.path).resize({ width: 700 }).toFile(filePath);

  let data = await cloudinary.uploader.upload(filePath);
  return data;
};

const removeFileFromServer = (filename: string) => {
  fs.unlink(path.resolve(__dirname, `../uploads/${filename}`), (err) => {
    if (err) logger.error(err);
  });
  fs.unlink(
    path.resolve(__dirname, `../uploads/resized/${filename}`),
    (err) => {
      if (err) logger.error(err);
    }
  );
};

export const addListing = async (req: Request, res: Response) => {
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
    galleryUrls.push({
      url: fileUrl.secure_url.split(cloudinaryInitial)[1],
      public_id: fileUrl.public_id,
    });
  }

  removeFileFromServer(avatar.filename);
  for (let i = 0; i < gallery.length; i++) {
    removeFileFromServer(gallery[i].filename);
  }

  const services = JSON.parse(req.body.services);

  const listing: HydratedDocument<IListing> = new Listing({
    brandName: req.body.brandName,
    avatar: {
      url: avatarUrl.secure_url.split(cloudinaryInitial)[1],
      public_id: avatarUrl.public_id,
    },
    gallery: galleryUrls,
    services: services,
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
  const query = Listing.find({ deleted: false })
    .sort({ createdAt: "desc" })
    .skip(page * limit)
    .limit(limit);

  const listings = await useCache("listings", query);
  return res.status(200).json({ listings });
};

export const getOneListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;

  const listing = await Listing.getFullListing({
    _id: listingId,
    deleted: false,
  });

  if (!listing) throw new Error("No listing found");
  const reviews = await Review.find({ listing: listingId });
  return res.status(200).json({ listing, reviews });
};
