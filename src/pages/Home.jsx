import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import { MovieComponents } from "../components";

function Home() {
  useNowPlayingMovies();

  return (
    <div className="mt-16">
      <MovieComponents />
    </div>
  );
}

export default Home;
