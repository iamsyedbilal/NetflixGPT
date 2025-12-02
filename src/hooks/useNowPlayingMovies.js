import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovie } from "../features/movies/movieSlice";
import { API_OPTIONS } from "../constants/constant";

function useNowPlayingMovies() {
  const dispatch = useDispatch();

  const getNowPlayingMovieData = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addNowPlayingMovie(json.results));
  }, [dispatch]);

  useEffect(() => {
    getNowPlayingMovieData();
  }, [getNowPlayingMovieData]);
}

export default useNowPlayingMovies;
