import { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { API_OPTIONS } from "../constants/constant";

function NowPlayingMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    async function fetchNowPlaying() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?page=${page}`,
        API_OPTIONS
      );
      const data = await res.json();
      setMovies((prev) => [...prev, ...data.results]);
    }

    fetchNowPlaying();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            movieId={movie.id}
          />
        ))}
      </div>
      <div
        ref={loader}
        className="h-20 flex justify-center items-center text-gray-400"
      >
        Loading more...
      </div>
    </div>
  );
}

export default NowPlayingMovies;
