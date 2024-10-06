import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  movieId: mongoose.Types.ObjectId;
  reviewerName?: string;
  rating: number;
  comments: string;
}

const ReviewSchema: Schema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  reviewerName: { type: String },
  rating: { type: Number, required: true, min: 1, max: 10 },
  comments: { type: String, required: true },
});

export default mongoose.model<IReview>("Review", ReviewSchema);
