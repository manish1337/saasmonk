import { Document } from "mongoose";
import { Movie } from "./Movie";

export interface Review extends Document {
  movieId: Movie["_id"];
  reviewerName?: string;
  rating: number;
  comments: string;
}
