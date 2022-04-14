import mongoose from "mongoose";

export interface IProfession {
  name: string;
}

const professionSchema = new mongoose.Schema<IProfession>({
  name: {
    type: String,
    required: [true, "Profession is required"],
    trim: true,
  },
});

export default mongoose.model<IProfession>("Profession", professionSchema);
