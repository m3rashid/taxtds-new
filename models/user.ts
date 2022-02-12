import mongoose from "mongoose";

export const StateUt = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman & Diu",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  phone: number;
  name: string;
  experience: number;
  addressLineOne: string;
  addressLineTwo?: string;
  state: string;
  avatar: string;
  professions: any;
  disabled?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: [true, "username is requierd"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String },
    phone: { type: Number, required: [true, "Phone number is required"] },
    name: { type: String, required: [true, "Name is required"] },
    experience: { type: Number },
    addressLineOne: { type: String, required: [true, "Address is required"] },
    addressLineTwo: { type: String },
    state: { type: String, enum: StateUt },
    avatar: { type: String },
    professions: { type: [mongoose.Schema.Types.ObjectId], ref: "Profession" },
    disabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
