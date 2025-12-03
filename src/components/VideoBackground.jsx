import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

function VideoBackground({ movieId }) {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  if (!trailerVideo?.key) {
    return <div className="absolute inset-0 bg-black -z-10" />;
  }

  return (
    <div className="w-screen">
      <iframe
        title="Movie Trailer"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&repeat=6`}
        className="w-full aspect-video object-cover pointer-events-none"
        frameBorder="0"
        allow="picture-in-picture; gyroscope; accelerometer; autoplay; clipboard-write; encrypted-media"
      />
    </div>
  );
}

export default VideoBackground;
