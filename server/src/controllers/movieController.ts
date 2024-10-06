import { Request, Response } from "express";
import * as movieService from "../services/movieService";
import { handleError } from "../utils/errorHandler";
import { getPaginationOptions } from "../utils/pagination";

// Get all movies with average ratings
export const getAllMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const paginationOptions = getPaginationOptions(req);
    const movies = await movieService.getAllMovies(paginationOptions);
    res.json({ success: true, data: movies });
  } catch (error) {
    handleError(res, error);
  }
};

// Get a single movie by ID with reviews
export const getMovieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie" });
  }
};

// Create a new movie
export const createMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newMovie = await movieService.createMovie(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: "Error creating movie" });
  }
};

// Update an existing movie
export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedMovie = await movieService.updateMovie(
      req.params.id,
      req.body
    );
    if (!updatedMovie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: "Error updating movie" });
  }
};

// Delete a movie and its associated reviews
export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedMovie = await movieService.deleteMovie(req.params.id);
    if (!deletedMovie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json({ message: "Movie and associated reviews deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie" });
  }
};
