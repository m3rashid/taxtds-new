import mongoose from "mongoose";

export interface IProfessionName extends mongoose.Document {
  _id?: string;
  name: string;
  createdAt?: any;
  updatedAt?: any;
}

const professionNameSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Profession is required"] },
  },
  { timestamps: true }
);

export default mongoose.model<IProfessionName>(
  "ProfessionName",
  professionNameSchema
);
