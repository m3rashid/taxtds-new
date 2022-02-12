import mongoose from "mongoose";

export interface IServiceName {
  _id?: string;
  name: string;
  createdAt?: any;
  updatedAt?: any;
}

const serviceNameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IServiceName>("ServiceName", serviceNameSchema);
