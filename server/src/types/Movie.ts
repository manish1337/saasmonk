import { Document } from "mongoose";

export interface Movie extends Document {
  name: string;
  releaseDate: Date;
  averageRating: number | null;
}
