import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTrending,
  addTopRated,
  addUpcoming,
  addAction,
  addHorror,
  addComedy,
  addRomance,
  addSciFi,
  addAnimation,
  addDocumentary,
} from "../features/movies/movieSlice";
import { API_OPTIONS } from "../constants/constant";

export default function useExtraMovieCategories() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async (url, reducer) => {
      const data = await fetch(url, API_OPTIONS);
      const json = await data.json();
      dispatch(reducer(json.results));
    };
    fetchCategory(
      "https://api.themoviedb.org/3/trending/movie/week",
      addTrending
    );
    fetchCategory("https://api.themoviedb.org/3/movie/top_rated", addTopRated);
    fetchCategory("https://api.themoviedb.org/3/movie/upcoming", addUpcoming);

    fetchCategory(
      "https://api.themoviedb.org/3/discover/movie?with_genres=28",
      addAction
    );
    fetchCategory(
      "https://api.themoviedb.org/3/discover/movie?with_genres=27",
      addHorror
    );
    fetchCategory(
      "https://api.themoviedb.org/3/discover/movie?with_genres=35",
      addComedy
    );
    fetchCategory(
      "https://api.themoviedb.org/3/discover/movie?with_genres=10749",
      addRomance
    );
    fetchCategory(
      "https://api.themoviedb.org/3/discover/movie?with_genres=878",
      addSciFi
    );
    fetchCategory(
      "https://api.themoviedb.org/3/discover/movie?with_genres=16",
      addAnimation
    );
    fetchCategory(
      "https://api.themoviedb.org/3/discover/movie?with_genres=99",
      addDocumentary
    );
  }, [dispatch]);
}
