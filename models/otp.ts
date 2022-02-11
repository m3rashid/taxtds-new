import mongoose from "mongoose";

export interface IOtp {
  email: string;
  otp: number;
}

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  validity: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IOtp>("Otp", otpSchema);
