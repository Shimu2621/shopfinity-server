import mongoose, { Schema } from "mongoose";
import { IReview } from "../interfaces/review.interface";

const reviewSchema = new Schema<IReview>({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
