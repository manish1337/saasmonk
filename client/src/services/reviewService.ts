import { api } from "./api";
import { Review } from "../types/Review";

export const getReviewsByMovieId = async (
  movieId: string
): Promise<Review[]> => {
  const response = await api.get(`/reviews/movie/${movieId}`);
  return response.data;
};

export const createReview = async (
  reviewData: Partial<Review>
): Promise<Review> => {
  const response = await api.post("/reviews", reviewData);
  return response.data;
};
