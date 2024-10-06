import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMovieById, deleteMovie } from "../services/movieService";
import { getReviewsByMovieId, createReview } from "../services/reviewService";
import { Movie } from "../types/Movie";
import { Review } from "../types/Review";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    rating: 0,
    comments: "",
  });

  useEffect(() => {
    if (id) {
      fetchMovie(id);
      fetchReviews(id);
    }
  }, [id]);

  const fetchMovie = async (movieId: string) => {
    try {
      const fetchedMovie = await getMovieById(movieId);
      setMovie(fetchedMovie);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setLoading(false);
    }
  };

  const fetchReviews = async (movieId: string) => {
    try {
      const fetchedReviews = await getReviewsByMovieId(movieId);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async () => {
    if (
      movie &&
      window.confirm("Are you sure you want to delete this movie?")
    ) {
      try {
        await deleteMovie(movie._id);
        navigate("/");
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (movie) {
      try {
        const createdReview = await createReview({
          ...newReview,
          movieId: movie._id,
        });
        setReviews([...reviews, createdReview]);
        setNewReview({ reviewerName: "", rating: 0, comments: "" });
      } catch (error) {
        console.error("Error creating review:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
      <p className="text-gray-600 mb-2">
        Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-4">
        Average Rating: {movie.averageRating?.toFixed(1) || "N/A"}
      </p>
      <div className="flex space-x-4 mb-8">
        <Link
          to={`/edit-movie/${movie._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-semibold">{review.reviewerName || "Anonymous"}</p>
          <p className="text-yellow-500">Rating: {review.rating}/10</p>
          <p>{review.comments}</p>
        </div>
      ))}

      <h3 className="text-xl font-bold mt-8 mb-4">Add a Review</h3>
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="reviewerName"
            className="block text-sm font-medium text-gray-700"
          >
            Name (optional)
          </label>
          <input
            type="text"
            id="reviewerName"
            value={newReview.reviewerName}
            onChange={(e) =>
              setNewReview({ ...newReview, reviewerName: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            min="1"
            max="10"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: parseInt(e.target.value) })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-700"
          >
            Comments
          </label>
          <textarea
            id="comments"
            value={newReview.comments}
            onChange={(e) =>
              setNewReview({ ...newReview, comments: e.target.value })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default MovieDetails;
