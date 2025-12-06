import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovie: null,
    popularMovie: null,
    trending: null,
    topRated: null,
    upcoming: null,
    action: null,
    horror: null,
    comedy: null,
    romance: null,
    sciFi: null,
    animation: null,
    documentary: null,
    trailerVideo: null,
    watchLater: [],
  },
  reducers: {
    addNowPlayingMovie: (state, action) => {
      state.nowPlayingMovie = action.payload;
    },
    addPopularMovie: (state, action) => {
      state.popularMovie = action.payload;
    },
    addTrending: (state, action) => {
      state.trending = action.payload;
    },
    addTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    addUpcoming: (state, action) => {
      state.upcoming = action.payload;
    },
    addAction: (state, action) => {
      state.action = action.payload;
    },
    addHorror: (state, action) => {
      state.horror = action.payload;
    },
    addComedy: (state, action) => {
      state.comedy = action.payload;
    },
    addRomance: (state, action) => {
      state.romance = action.payload;
    },
    addSciFi: (state, action) => {
      state.sciFi = action.payload;
    },
    addAnimation: (state, action) => {
      state.animation = action.payload;
    },
    addDocumentary: (state, action) => {
      state.documentary = action.payload;
    },

    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },

    addWatchLater: (state, action) => {
      state.watchLater = action.payload;
    },
  },
});

export const {
  addNowPlayingMovie,
  addPopularMovie,
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
  addTrailerVideo,
  addWatchLater,
} = movieSlice.actions;

export default movieSlice.reducer;
