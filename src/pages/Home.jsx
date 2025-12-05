import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovie from "../hooks/usePopularMovie";
import { MovieComponents, Movies } from "../components";
import { useSelector } from "react-redux";
import { GPT } from "./";

function Home() {
  useNowPlayingMovies();
  usePopularMovie();

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div className="h-full w-full">
      {showGptSearch ? (
        <GPT />
      ) : (
        <>
          <MovieComponents />
          <Movies />
        </>
      )}
    </div>
  );
}

export default Home;
