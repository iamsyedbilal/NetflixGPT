import { MovieList } from "./index";
import { useSelector } from "react-redux";

function Movies() {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="">
      <MovieList title="Up Coming" movies={movies.upcoming} />
      <MovieList title="Top Rated" movies={movies.topRated} />
      <MovieList title="Popular Movies" movies={movies.popularMovie} />
      <MovieList title="Trending" movies={movies.trending} />
      <MovieList title="Now Playing Movie" movies={movies.nowPlayingMovie} />
      {/* <MovieList title="Watch Later" movies={movies.watchLater} /> */}
      <MovieList title="Animation" movies={movies.animation} />
      <MovieList title="Comedy" movies={movies.comedy} />
      <MovieList title="Documentary" movies={movies.documentary} />
      <MovieList title="Horror" movies={movies.horror} />
      <MovieList title="Romance" movies={movies.romance} />
      <MovieList title="SciFi" movies={movies.sciFi} />
      <MovieList title="Action" movies={movies.action} />
    </div>
  );
}

export default Movies;
