import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/edit-movie/:id" element={<EditMovie />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
