import { useEffect } from "react";
import { API_OPTIONS } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../features/movies/movieSlice";

function VideoBackground({ movieId }) {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useEffect(() => {
    if (!movieId) return;

    async function getMovieVideo() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        const data = await res.json();

        const trailers = data.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailer = trailers.length ? trailers[0] : data.results[0];

        if (trailer) {
          dispatch(addTrailerVideo(trailer));
        }
      } catch (err) {
        console.error("Failed to fetch movie video", err);
      }
    }

    getMovieVideo();
  }, [movieId, dispatch]);

  if (!trailerVideo?.key) {
    return (
      <div
        className="absolute inset-0 w-screen h-screen bg-black"
        style={{ zIndex: -1 }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <iframe
        title="Movie Trailer"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop`}
        className="w-full h-full object-cover"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      {/* Optional gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
    </div>
  );
}

export default VideoBackground;
