import { api } from "./api";
import { Movie } from "../types/Movie";

export const getMovies = async (
  page: number = 1,
  limit: number = 10
): Promise<Movie[]> => {
  const response = await api.get(`/movies?page=${page}&limit=${limit}`);
  return response.data.data;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

export const createMovie = async (
  movieData: Partial<Movie>
): Promise<Movie> => {
  const response = await api.post("/movies", movieData);
  return response.data;
};

export const updateMovie = async (
  id: string,
  movieData: Partial<Movie>
): Promise<Movie> => {
  const response = await api.put(`/movies/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id: string): Promise<void> => {
  await api.delete(`/movies/${id}`);
};
