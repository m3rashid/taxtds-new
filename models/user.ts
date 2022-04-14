import mongoose from "mongoose";

import { StateUt } from "../bulk/state";

export interface IUser {
  email: string;
  role: "USER" | "ADMIN";
  password: string;
  phone: string;
  name: string;
  experience: number;
  addressLineOne: string;
  addressLineTwo?: string;
  state: string;
  professions: mongoose.Types.ObjectId[];
  deleted?: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      trim: true,
    },
    password: { type: String },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    name: { type: String, required: [true, "Name is required"], trim: true },
    experience: { type: Number, trim: true },
    addressLineOne: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    addressLineTwo: { type: String, trim: true },
    state: { type: String, enum: StateUt, trim: true },
    professions: { type: [mongoose.Schema.Types.ObjectId], ref: "Profession" },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
