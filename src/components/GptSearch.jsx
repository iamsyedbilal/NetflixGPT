import { GptSearchBar, GptMovieSuggesation } from "./";

function GptSearch() {
  return (
    <div className="pt-10 px-4 sm:px-10">
      <GptSearchBar />
      <GptMovieSuggesation />
    </div>
  );
}

export default GptSearch;
