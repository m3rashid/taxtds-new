import mongoose from "mongoose";

export interface IService extends mongoose.Document {
  _id?: string;
  name: string;
  createdAt?: any;
  updatedAt?: any;
}

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IService>("Service", serviceSchema);
