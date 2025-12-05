import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGptMovieResults } from "../features/gpt/gptSlice";
import { fetchGPTMovies } from "../openAI/openAI";
import {
  API_OPTIONS,
  PLACEHOLDER_TEXT,
  TMDB_LANGUAGE_CODES,
} from "../constants/constant";

function GptSearchBar() {
  const [language, setLanguage] = useState("en");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  async function searchMovieTMDB(movie) {
    const langCode = TMDB_LANGUAGE_CODES[language] || "en-US";

    console.log(langCode);

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movie
    )}&include_adult=true&language=${langCode}&page=1`;

    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();
    return json.results;
  }

  async function handleGptSearchClick() {
    if (!query.trim()) return;

    const movies = await fetchGPTMovies(query, language);

    const data = movies.map((movie) => searchMovieTMDB(movie));
    const tmdbResultsNested = await Promise.all(data);
    const tmdbResults = tmdbResultsNested.flat();

    dispatch(setGptMovieResults(tmdbResults));

    setQuery("");
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={PLACEHOLDER_TEXT[language]}
        className="w-full sm:w-2/3 lg:w-1/2 px-5 py-3 
                   bg-white/10 text-white placeholder-gray-300
                   rounded-lg outline-none border border-transparent
                   focus:border-red-500 transition"
      />

      {/* Language Dropdown */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-4 py-3 bg-white/10 text-white rounded-lg
                   border border-transparent focus:border-red-500
                   outline-none cursor-pointer transition"
      >
        <option value="en" className="bg-black text-white">
          English
        </option>
        <option value="ur" className="bg-black text-white">
          Urdu
        </option>
        <option value="hi" className="bg-black text-white">
          Hindi
        </option>
        <option value="es" className="bg-black text-white">
          Spanish
        </option>
        <option value="fr" className="bg-black text-white">
          French
        </option>
        <option value="jp" className="bg-black text-white">
          Japanese
        </option>
        <option value="kr" className="bg-black text-white">
          Korean
        </option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleGptSearchClick}
        disabled={!query.trim()}
        className={`px-6 py-3 rounded-lg text-white transition ${
          query.trim()
            ? "bg-red-600 hover:bg-red-700 cursor-pointer"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        Search
      </button>
    </div>
  );
}

export default GptSearchBar;
