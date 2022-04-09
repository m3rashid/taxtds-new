import mongoose from "mongoose";

export interface IProfession extends mongoose.Document {
  _id?: string;
  name: string;
  createdAt?: any;
  updatedAt?: any;
}

const professionSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Profession is required"] },
  },
  { timestamps: true }
);

export default mongoose.model<IProfession>("Profession", professionSchema);
