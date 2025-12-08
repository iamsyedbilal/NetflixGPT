import { GptSearchBar, GptMovieSuggesation, SkeletonMovieRow } from "./";
import { useSelector } from "react-redux";

function GptSearch() {
  const { loading } = useSelector((state) => state.gpt);

  return (
    <div className="pt-10 px-4 sm:px-10">
      <GptSearchBar />
      <div className="">
        {loading && <SkeletonMovieRow title="Searching movies..." />}
      </div>

      {!loading && <GptMovieSuggesation />}
    </div>
  );
}

export default GptSearch;
