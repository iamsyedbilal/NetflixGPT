import { IMG_CDN_URL } from "../constants/constant";

function MovieCard({ posterPath }) {
  if (!posterPath) return null;

  return (
    <div className="min-w-20 md:min-w-40 cursor-pointer transition-transform duration-300 hover:scale-110 hover:brightness-110">
      <img
        src={IMG_CDN_URL + posterPath}
        className="w-full h-auto rounded-md shadow-lg"
        alt="movie poster"
      />
    </div>
  );
}

export default MovieCard;
