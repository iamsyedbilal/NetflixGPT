import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovie } from "../features/movies/movieSlice";
import { API_OPTIONS } from "../constants/constant";

function usePopularMovie() {
  const dispatch = useDispatch();

  const getPopularMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?&page=2",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addPopularMovie(json.results));
  }, [dispatch]);

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);
}

export default usePopularMovie;
