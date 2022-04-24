import mongoose from "mongoose";

export interface IReview {
  name: string;
  rating: number;
  review?: string;
  listing: mongoose.Types.ObjectId;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    name: { type: String, default: "Anonymous", trim: true },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 0,
      max: 10,
      trim: true,
    },
    review: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", reviewSchema);
