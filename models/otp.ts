import mongoose from "mongoose";

export interface IOtp {
  _id?: string;
  email: string;
  otp: number;
  createdAt?: any;
  updatedAt?: any;
}

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: [true, "Email is required"] },
    otp: { type: Number, required: [true, "OTP is required"] },
  },
  { timestamps: true }
);

export default mongoose.model<IOtp>("Otp", otpSchema);
