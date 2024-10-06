import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByMovieId,
  searchReviews,
} from "../controllers/reviewController";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/search", searchReviews);
router.get("/:id", getReviewById);
router.get("/movie/:movieId", getReviewsByMovieId);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
