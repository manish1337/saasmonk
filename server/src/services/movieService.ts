import Movie from "../models/Movie";
import Review from "../models/Review";
import { Movie as MovieType } from "../types/Movie";
import { PaginationOptions, paginateResults } from "../utils/pagination";
import { isValidDate } from "../utils/validation";
import { IMovie } from "../models/Movie"; // Add this import at the top of the file

export const getAllMovies = async (
  options: PaginationOptions
): Promise<MovieType[]> => {
  const movies = await Movie.find().sort({ releaseDate: -1 });
  return paginateResults(movies, options.page, options.limit);
};

export const getMovieById = async (id: string): Promise<MovieType | null> => {
  return Movie.findById(id);
};

export const createMovie = async (
  movieData: Partial<MovieType>
): Promise<MovieType> => {
  if (!isValidDate(movieData.releaseDate?.toString() || "")) {
    throw new Error("Invalid release date");
  }
  const newMovie = new Movie(movieData);
  return newMovie.save();
};

export const updateMovie = async (
  id: string,
  movieData: Partial<IMovie>
): Promise<IMovie | null> => {
  return Movie.findByIdAndUpdate(id, movieData, { new: true });
};

export const deleteMovie = async (id: string): Promise<IMovie | null> => {
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (deletedMovie) {
    await Review.deleteMany({ movieId: id });
  }
  return deletedMovie;
};

export const updateMovieAverageRating = async (
  movieId: string
): Promise<void> => {
  const reviews = await Review.find({ movieId });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating =
    reviews.length > 0 ? totalRating / reviews.length : null;
  await Movie.findByIdAndUpdate(movieId, { averageRating });
};
