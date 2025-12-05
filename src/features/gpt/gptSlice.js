import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovieResults: [],
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setGptMovieResults: (state, action) => {
      state.gptMovieResults = action.payload;
    },
  },
});

export const { toggleGptSearchView, setGptMovieResults } = gptSlice.actions;

export default gptSlice.reducer;
