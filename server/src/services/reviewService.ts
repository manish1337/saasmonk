import Review from "../models/Review";
import { Review as ReviewType } from "../types/Review";
import { PaginationOptions, paginateResults } from "../utils/pagination";
import { isValidRating } from "../utils/validation";
import { updateMovieAverageRating } from "./movieService";
import { IReview } from "../models/Review";

export const getAllReviews = async (
  options: PaginationOptions
): Promise<ReviewType[]> => {
  const reviews = await Review.find()
    .populate("movieId")
    .sort({ createdAt: -1 });
  return paginateResults(reviews, options.page, options.limit);
};

export const getReviewById = async (id: string): Promise<IReview | null> => {
  return Review.findById(id).populate("movieId");
};

export const createReview = async (
  reviewData: Partial<ReviewType>
): Promise<ReviewType> => {
  if (!isValidRating(reviewData.rating || 0)) {
    throw new Error("Invalid rating");
  }
  const newReview = new Review(reviewData);
  await newReview.save();
  await updateMovieAverageRating(newReview.movieId.toString());
  return newReview;
};

export const updateReview = async (
  id: string,
  reviewData: Partial<IReview>
): Promise<IReview | null> => {
  const updatedReview = await Review.findByIdAndUpdate(id, reviewData, {
    new: true,
  });
  if (updatedReview) {
    await updateMovieAverageRating(updatedReview.movieId.toString());
  }
  return updatedReview;
};

export const deleteReview = async (id: string): Promise<IReview | null> => {
  const deletedReview = await Review.findByIdAndDelete(id);
  if (deletedReview) {
    await updateMovieAverageRating(deletedReview.movieId.toString());
  }
  return deletedReview;
};

export const getReviewsByMovieId = async (
  movieId: string
): Promise<IReview[]> => {
  return Review.find({ movieId }).populate("movieId");
};

export const searchReviews = async (query: string): Promise<IReview[]> => {
  return Review.find({
    $or: [
      { reviewerName: { $regex: query, $options: "i" } },
      { comments: { $regex: query, $options: "i" } },
    ],
  }).populate("movieId");
};
