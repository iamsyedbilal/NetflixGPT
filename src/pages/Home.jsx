import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovie from "../hooks/usePopularMovie";
import useExtraMovieCategories from "../hooks/useExtraMovieCategories";
import { MovieComponents, Movies } from "../components";
import { useSelector } from "react-redux";
import { GPT } from "./";

function Home() {
  useNowPlayingMovies();
  usePopularMovie();
  useExtraMovieCategories();

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div className="w-full min-h-screen">
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
