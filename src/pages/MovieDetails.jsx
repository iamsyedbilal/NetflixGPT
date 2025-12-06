import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL } from "../constants/constant";
import { IoPlaySharp, IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addWatchLater } from "../features/movies/movieSlice";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const watchLater = useSelector((store) => store.movies.watchLater);

  const [movie, setMovie] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`,
        API_OPTIONS
      );
      const data = await res.json();
      setMovie(data);
      setAdded(watchLater.some((m) => m.id === data.id));
    }

    fetchMovie();
  }, [id, watchLater]);

  if (!movie)
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const handleAddWatchlist = () => {
    if (!added) {
      dispatch(addWatchLater([...watchLater, movie]));
      setAdded(true);
    } else {
      const updatedList = watchLater.filter((m) => m.id !== movie.id);
      dispatch(addWatchLater(updatedList));
      setAdded(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative h-80 sm:h-96 md:h-[500px] lg:h-[600px] flex items-end bg-black/70"
        style={{
          backgroundImage: `url(${IMG_CDN_URL + movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-gray-300 italic mt-1">{movie.tagline}</p>
          )}
          <div className="flex gap-2 sm:gap-4 mt-4 flex-wrap">
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold"
              >
                <IoPlaySharp size={20} />
                Play Trailer
              </a>
            )}
            <button
              onClick={handleAddWatchlist}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold cursor-pointer ${
                added ? "bg-gray-500" : "bg-gray-600/70 hover:bg-gray-500/70"
              }`}
            >
              <IoAdd size={18} />
              {added ? "Remove From Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-4 sm:px-8 py-6 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold">Overview</h2>
        <p className="text-gray-300">{movie.overview}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-400">
          <p>
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {movie.vote_average}{" "}
            ⭐ ({movie.vote_count})
          </p>
          <p>
            <span className="font-semibold">Runtime:</span> {movie.runtime} min
          </p>
          <p>
            <span className="font-semibold">Genres:</span>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            {movie.spoken_languages.map((l) => l.english_name).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Production:</span>{" "}
            {movie.production_companies.map((p) => p.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Budget:</span> $
            {movie.budget.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Revenue:</span> $
            {movie.revenue.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {movie.status}
          </p>
          <p>
            <span className="font-semibold">Original Language:</span>{" "}
            {movie.original_language.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
