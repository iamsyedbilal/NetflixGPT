import { useSelector } from "react-redux";
import { VideoTitle, VideoBackground } from "./";

function MovieComponents() {
  const movies = useSelector((store) => store.movies?.nowPlayingMovie);
  if (!movies) return null;

  const randomMovieNumber = Math.floor(Math.random() * movies.length);
  const movie = movies[randomMovieNumber];

  const { original_title, overview, id } = movie;

  return (
    <div className="relative w-full h-[90vh] text-white">
      <VideoBackground movieId={id} />
      <div className="absolute top-1/4 left-8 max-w-xl space-y-4">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </div>
  );
}

export default MovieComponents;
