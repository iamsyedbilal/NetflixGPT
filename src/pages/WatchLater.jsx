import { useSelector } from "react-redux";
import { MovieCard } from "../components";

function WatchLater() {
  const watchLater = useSelector((store) => store.movies.watchLater);

  if (!watchLater || watchLater.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Your Watchlist is Empty 😔
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 mt-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Watchlist ❤️</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {watchLater.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            movieId={movie.id}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchLater;
