import { useSelector } from "react-redux";
import { MovieCard, SkeletonMovieRow } from "./";

function GptMovieSuggesation() {
  const suggestedMovies = useSelector((store) => store.gpt.gptMovieResults);
  const isLoading = suggestedMovies === null;

  return (
    <div className="py-3 px-2 sm:px-4">
      <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>

      {isLoading && <SkeletonMovieRow title="Recommended for you" />}

      {!isLoading && (!suggestedMovies || suggestedMovies.length === 0) && (
        <div className="py-10 flex justify-center items-center text-white text-lg">
          No recommendations found.
        </div>
      )}

      {!isLoading && suggestedMovies && suggestedMovies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {suggestedMovies.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 rounded-md overflow-hidden shadow-lg flex flex-col"
            >
              {item.poster_path ? (
                <MovieCard posterPath={item.poster_path} movieId={item.id} />
              ) : (
                <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                  No Image
                </div>
              )}

              <div className="p-2 flex flex-col grow">
                <h3 className="text-white font-semibold text-sm">
                  {item.title || item.original_title}
                </h3>
                <p className="text-gray-300 text-xs mt-1">
                  {item.release_date ? item.release_date.slice(0, 4) : "N/A"}
                </p>
                <p className="text-yellow-400 text-xs mt-auto">
                  ⭐ {item.vote_average.toFixed(1)} ({item.vote_count})
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GptMovieSuggesation;
