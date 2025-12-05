import { useSelector } from "react-redux";

function GptMovieSuggesation() {
  const suggestedMovies = useSelector((store) => store.gpt.gptMovieResults);

  return (
    <div className="py-3">
      <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {suggestedMovies.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 rounded-md overflow-hidden shadow-lg flex flex-col"
          >
            {/* Poster */}
            {item.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                No Image
              </div>
            )}

            {/* Movie Info */}
            <div className="p-2 flex flex-col flex-grow">
              <h3 className="text-white font-semibold text-sm">
                {" "}
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
    </div>
  );
}

export default GptMovieSuggesation;
