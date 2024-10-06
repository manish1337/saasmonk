import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/movieService";
import { Movie } from "../types/Movie";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie._id}
            to={`/movies/${movie._id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.name}</h2>
              <p className="text-gray-600">
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Average Rating: {movie.averageRating?.toFixed(1) || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
