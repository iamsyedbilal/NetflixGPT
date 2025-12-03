import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovie from "../hooks/usePopularMovie";
import { MovieComponents, Movies } from "../components";

function Home() {
  useNowPlayingMovies();
  usePopularMovie();

  return (
    <div className="h-full w-full">
      <MovieComponents />
      <Movies />
    </div>
  );
}

export default Home;
