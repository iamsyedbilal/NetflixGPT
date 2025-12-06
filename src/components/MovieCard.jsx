import { IMG_CDN_URL } from "../constants/constant";

import { useNavigate } from "react-router-dom";

function MovieCard({ posterPath, movieId }) {
  const navigate = useNavigate();
  if (!posterPath) return null;

  return (
    <div
      onClick={() => navigate(`/movie/${movieId}`)}
      className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] cursor-pointer transition-transform duration-300 hover:scale-105 hover:brightness-110"
    >
      <img
        src={IMG_CDN_URL + posterPath}
        className="w-full h-auto rounded-md shadow-lg"
        alt="movie poster"
      />
    </div>
  );
}

export default MovieCard;
