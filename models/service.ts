import mongoose from "mongoose";

import { IUser } from "./user";
import { StateUt } from "./user";
export interface IReview {
  name: string;
  rating: number;
  comment: string;
}

export interface IService {
  _id?: string;
  brandName: string;
  tagline?: string;
  avatar: string;
  gallery: Array<string>;
  owner: string;
  experience: number;
  establishment: string;
  addedBy: IUser;
  phone: string;
  email: string;
  professions: Array<string>;
  address: string;
  state: string;
  services: Array<string>;
  reviews?: IReview[];
}

const serviceSchema = new mongoose.Schema({
  brandName: { type: String, required: [true, "Brand must have a name"] },
  avatar: { type: String, required: [true, "Avatar image is required"] },
  gallery: {
    type: [String],
    min: [1, "Images are required"],
    max: [3, "Too many images"],
  },
  services: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ServiceName",
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
});

export default mongoose.model<IService>("Service", serviceSchema);
