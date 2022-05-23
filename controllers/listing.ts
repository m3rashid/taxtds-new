import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import mongoose, { HydratedDocument } from "mongoose";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import Listing, { IListing, Image } from "../models/listing";
import { paginationConfig } from "./helpers";
import logger from "../utils/logger";
import appConfig from "../utils/appConfig";
import sendMail from "../utils/nodemailer";
import { IEditListing } from "../mailerTemplates";

cloudinary.config({
  cloud_name: appConfig.cloudinary.cloudName,
  api_key: appConfig.cloudinary.apiKey,
  api_secret: appConfig.cloudinary.apiSecret,
  secure: true,
});

export const cloudinaryInitial = `https://res.cloudinary.com/${appConfig.cloudinary.cloudName}/image/upload/`;

const uploadFiles = async (file: Express.Multer.File) => {
  let filePath = path.resolve(__dirname, `../uploads/resized/${file.filename}`);
  await sharp(file.path).resize({ width: 700 }).toFile(filePath);
  return await cloudinary.uploader.upload(filePath);
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
  const updatedListing = await Listing.findByIdAndUpdate(listingId, {
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
  sendMail({
    emailId: listing.email,
    type: "EDIT_LISTING",
    subject: "Your Listing was updated",
    textVersion: `Your listing was updated`,
    data: {
      brandName: updatedListing ? updatedListing.brandName : req.body.brandName,
      listingId: listingId,
    } as IEditListing,
  });
  return res.status(200).json({ message: "Listing updated successfully" });
};

export const removeListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;
  const listing = await Listing.findOneAndUpdate(
    { _id: listingId, addedBy: req.user },
    { $set: { deleted: true } }
  );
  sendMail({
    emailId: listing?.email || "",
    subject: "Listing removed",
    type: "DELETE_LISTING_BY_USER",
    textVersion: `You delted one of your listings`,
    data: {},
  });
  return res.status(200).json({ message: "Listing removed successfully" });
};

export const getAllListings = async (req: Request, res: Response) => {
  const { page, limit } = paginationConfig(req);
  const pipeline: mongoose.PipelineStage[] = [
    { $match: { deleted: false } },
    { $sort: { createdAt: -1 } },
    {
      $unset: [
        "addedBy",
        "addressLineOne",
        "addressLineTwo",
        "createdAt",
        "updatedAt",
        "deleted",
        "gallery",
        "reviews",
        "services",
      ],
    },
    {
      $facet: {
        metadata: [{ $count: "count" }],
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: page * limit },
          { $limit: limit },
        ],
      },
    },
  ];

  const results = await Listing.aggregate(pipeline);
  const listings = results[0].data;
  const count = results[0].metadata[0].count;

  const pagination = {
    limit,
    count,
    hasMore: page * limit < count,
    hasPrevious: page !== 0,
    currentPage: page,
  };

  return res.status(200).json({ listings, pagination });
};

export const getUserListings = async (req: Request, res: Response) => {
  const listings = await Listing.find({ deleted: false, addedBy: req.user })
    .select([
      "-addedBy",
      "-addressLineOne",
      "-addressLineTwo",
      "-createdAt",
      "-updatedAt",
      "-deleted",
      "-gallery",
      "-reviews",
      "-services",
    ])
    .lean();

  return res.status(200).json({ listings });
};

export const getOneListing = async (req: Request, res: Response) => {
  const { listingId } = req.body;

  const aggrPipeline = [
    {
      $match: {
        $and: [
          { deleted: false },
          { _id: new mongoose.Types.ObjectId(listingId) },
        ],
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "services",
        foreignField: "_id",
        as: "services",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "addedBy",
        foreignField: "_id",
        as: "addedBy",
      },
    },
    { $unwind: { path: "$addedBy", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "professions",
        localField: "addedBy.professions",
        foreignField: "_id",
        as: "addedBy.professions",
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviews",
      },
    },
  ];

  const listing = await Listing.aggregate(aggrPipeline);

  if (!listing) throw new Error("No listing found");
  return res.status(200).json({ listing: listing[0] });
};
