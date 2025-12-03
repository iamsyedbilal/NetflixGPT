import { useSelector } from "react-redux";
import { VideoTitle, VideoBackground } from "./";
import { useMemo } from "react";

function MovieComponents() {
  const movies = useSelector((store) => store.movies?.nowPlayingMovie);

  const randomMovieNumber = useMemo(
    () => (movies ? Math.floor(Math.random() * movies.length) : 0),
    [movies]
  );

  const movie = movies ? movies[randomMovieNumber] : null;

  if (!movies || !movie) return null;

  const { original_title, overview, id } = movie;

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {/* Video Background */}
      <VideoBackground movieId={id} />

      {/* Overlay content */}
      <div className="absolute top-1/3 left-6 md:left-12 lg:left-20 z-10 max-w-xl space-y-4">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </div>
  );
}

export default MovieComponents;
