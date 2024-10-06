import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";
import { handleError } from "../utils/errorHandler";
import { getPaginationOptions } from "../utils/pagination";

export const getAllReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const paginationOptions = getPaginationOptions(req);
    const reviews = await reviewService.getAllReviews(paginationOptions);
    res.json({ success: true, data: reviews });
  } catch (error) {
    handleError(res, error);
  }
};

export const getReviewById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error fetching review" });
  }
};

export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error creating review" });
  }
};

export const updateReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body
    );
    if (!updatedReview) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: "Error updating review" });
  }
};

export const deleteReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedReview = await reviewService.deleteReview(req.params.id);
    if (!deletedReview) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review" });
  }
};

export const getReviewsByMovieId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reviews = await reviewService.getReviewsByMovieId(req.params.movieId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews for the movie" });
  }
};

export const searchReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      res.status(400).json({ message: "Search query is required" });
      return;
    }
    const reviews = await reviewService.searchReviews(query);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error searching reviews" });
  }
};
