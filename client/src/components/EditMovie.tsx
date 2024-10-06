import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, updateMovie } from "../services/movieService";
import { Movie } from "../types/Movie";

const EditMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    if (id) {
      fetchMovie(id);
    }
  }, [id]);

  const fetchMovie = async (movieId: string) => {
    try {
      const fetchedMovie = await getMovieById(movieId);
      setMovie(fetchedMovie);
      setName(fetchedMovie.name);
      setReleaseDate(
        new Date(fetchedMovie.releaseDate).toISOString().split("T")[0]
      );
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (movie) {
      try {
        await updateMovie(movie._id, {
          name,
          releaseDate: new Date(releaseDate),
        });
        navigate(`/movies/${movie._id}`);
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Movie Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium text-gray-700"
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
