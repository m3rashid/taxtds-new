import mongoose from "mongoose";

export interface IOtp {
  email: string;
  otp: number;
}

const otpSchema = new mongoose.Schema<IOtp>({
  email: { type: String, required: [true, "Email is required"], trim: true },
  otp: { type: Number, required: [true, "OTP is required"], trim: true },
});

export default mongoose.model<IOtp>("Otp", otpSchema);
