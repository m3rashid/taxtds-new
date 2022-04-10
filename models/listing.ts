import mongoose from "mongoose";

import { StateUt } from "./user";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
}

export interface Image {
  url: string;
  public_id: string;
}
export interface IListing extends mongoose.Document {
  _id?: string;
  brandName: string;
  avatar: string;
  gallery: Image[];
  services: any;
  addedBy: any;
  established: string;
  tagline?: string;
  owner: string;
  addressLineOne: string;
  addressLineTwo?: string;
  state: string;
  phone: string;
  email: string;
  deleted?: boolean;
  featured?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

const listingSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: [true, "Brand must have a name"] },
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
    established: { type: String },
    tagline: { type: String },
    owner: { type: String, required: [true, "Service must have an owner"] },
    addressLineOne: { type: String, required: [true, "Address is required"] },
    addressLineTwo: { type: String },
    state: { type: String, enum: StateUt },
    phone: { type: Number, required: [true, "Phone number is required"] },
    email: { type: String, required: [true, "Email is required"] },
    deleted: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IListing>("Listing", listingSchema);
