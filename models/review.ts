import mongoose from "mongoose";

export interface IReview {
  _id?: string;
  name: string;
  rating: number;
  comment?: string;
  service: any;
  createdAt?: any;
  updatedAt?: any;
}

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Anonymous" },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 0,
      max: 10,
    },
    comment: { type: String },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", reviewSchema);
