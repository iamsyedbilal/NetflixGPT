import { MovieList } from "./index";
import { useSelector } from "react-redux";

function Movies() {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="">
      <MovieList title="Now Playing" movies={movies.nowPlayingMovie} />
      <MovieList title="Popular Movies" movies={movies.popularMovie} />
      <MovieList title="Trending" movies={movies.nowPlayingMovie} />
      <MovieList title="Up Coming" movies={movies.nowPlayingMovie} />
      <MovieList title="Action" movies={movies.nowPlayingMovie} />
      <MovieList title="Horror" movies={movies.nowPlayingMovie} />
    </div>
  );
}

export default Movies;
