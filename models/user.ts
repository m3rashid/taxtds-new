import mongoose from "mongoose";
import { IService } from "./service";

export enum Role {
  ADMIN = "ADMIN",
  BUYER = "BUYER",
  SELLER = "SELLER",
}

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  name: string;
  services: IService[] | [];
  userType: string;
  upvotes: number;
  downvotes: number;
}

const userSchema = new mongoose.Schema({
  username: { type: String, trim: true, required: true },
  password: String,
  name: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  userType: { type: String, enum: Role, default: Role.BUYER },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

export default mongoose.model<IUser>("User", userSchema);
