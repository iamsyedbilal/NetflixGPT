import { useRef } from "react";
import { MovieCard, SkeletonMovieRow } from "./";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function MovieList({ title, movies }) {
  const rowRef = useRef(null);

  if (!movies) return <SkeletonMovieRow title={title} />;

  if (movies.length === 0) return null;

  const scroll = (direction) => {
    const { current } = rowRef;
    if (!current) return;

    const scrollAmount = current.clientWidth * 0.8;

    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-4 sm:px-8 mt-6 sm:mt-10">
      {/* Title */}
      <h2 className="text-white text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
        {title}
      </h2>

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
                 bg-black/40 hover:bg-black/70 text-white 
                 w-8 h-32 sm:w-10 sm:h-40 flex items-center justify-center 
                 rounded-r-lg opacity-0 hover:opacity-100 transition"
      >
        <BiChevronLeft size={20} />
      </button>

      {/* Movies Row */}
      <div
        ref={rowRef}
        className="flex overflow-x-scroll gap-2 sm:gap-3 pb-2 scroll-smooth no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            movieId={movie.id}
          />
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
                 bg-black/40 hover:bg-black/70 text-white 
                 w-8 h-32 sm:w-10 sm:h-40 flex items-center justify-center 
                 rounded-l-lg opacity-0 hover:opacity-100 transition"
      >
        <BiChevronRight size={20} />
      </button>
    </div>
  );
}

export default MovieList;
