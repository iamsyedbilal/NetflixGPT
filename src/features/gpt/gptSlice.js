import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovieResults: [],
    loading: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setGptMovieResults: (state, action) => {
      state.gptMovieResults = action.payload;
    },
    setGptLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleGptSearchView, setGptMovieResults, setGptLoading } =
  gptSlice.actions;

export default gptSlice.reducer;
