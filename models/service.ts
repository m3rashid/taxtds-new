import mongoose from "mongoose";
import { IUser } from "./user";

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
  brandName: { type: String, required: true },
  tagline: String,
  avatar: { type: String, required: true },
  gallery: [{ type: String, unique: true }],
  owner: { type: String, required: true },
  // experience in years
  experience: { type: Number, required: true },
  establishment: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  professions: [{ type: String, required: true }],
  address: { type: String, required: true },
  state: { type: String, required: true },
  services: [{ type: String }],
  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true, min: 0, max: 5 },
      comment: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IService>("Service", serviceSchema);
