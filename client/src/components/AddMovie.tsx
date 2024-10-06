import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../services/movieService";

const AddMovie: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovie({ name, releaseDate: new Date(releaseDate) });
      navigate("/");
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Movie</h1>
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
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
