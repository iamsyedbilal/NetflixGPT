import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import moviesReducer from "../features/movies/movieSlice";
import gptReducer from "../features/gpt/gptSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    gpt: gptReducer,
  },
});
