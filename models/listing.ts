import mongoose from "mongoose";

import { StateUt } from "../bulk/state";

export interface Image {
  url: string;
  public_id: string;
}

export interface IListing {
  brandName: string;
  avatar: string;
  gallery: Image[];
  services: mongoose.Types.ObjectId[];
  addedBy: mongoose.Types.ObjectId;
  established: string;
  tagline?: string;
  owner: string;
  addressLineOne: string;
  addressLineTwo?: string;
  state: string;
  phone: number | string;
  email: string;
  deleted?: boolean;
  featured?: boolean;
}

export interface ListingModel extends mongoose.Model<IListing> {
  getFullListing(query: any): any;
}

const listingSchema = new mongoose.Schema<IListing, ListingModel>(
  {
    brandName: {
      type: String,
      required: [true, "Brand must have a name"],
      trim: true,
    },
    avatar: {
      url: { type: String, required: [true, "Avatar image is required"] },
      public_id: { type: String, required: [true, "Avatar image is required"] },
    },
    gallery: {
      type: [
        {
          url: { type: String, required: true },
          public_id: { type: String, required: true },
        },
      ],
      min: [1, "Images are required"],
      max: [3, "Too many images"],
    },
    services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Service",
      min: [1, "You must have atleast one service"],
    },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    established: { type: String, trim: true },
    tagline: { type: String, trim: true },
    owner: {
      type: String,
      required: [true, "Service must have an owner"],
      trim: true,
    },
    addressLineOne: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    addressLineTwo: { type: String, trim: true },
    state: { type: String, enum: StateUt, trim: true },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: { type: String, required: [true, "Email is required"], trim: true },
    deleted: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

listingSchema.static("getFullListing", function getFullListing(query) {
  return this.findOne(query)
    .populate({
      path: "services",
      model: "Service",
    })
    .populate({
      path: "addedBy",
      populate: {
        path: "professions",
        model: "Profession",
      },
    });
});

export default mongoose.model<IListing, ListingModel>("Listing", listingSchema);
