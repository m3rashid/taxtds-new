import mongoose from "mongoose";

export interface IReview {
  _id?: string;
  name: string;
  rating: number;
  comment?: string;
  listing: any;
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
    review: { type: String },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", reviewSchema);
