import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { API_OPTIONS, IMG_CDN_URL } from "../constants/constant";

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchPopular() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${page}`,
        API_OPTIONS
      );
      const data = await res.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    }

    fetchPopular();
  }, [page]);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            movieId={movie.id}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6 py-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-600"
        >
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PopularMovies;
