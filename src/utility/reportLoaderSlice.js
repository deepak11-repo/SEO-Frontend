import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scoreLoader: true,
  screenshotLoader: true,
  urlLoader: true,
  titlemetaLoader: true,
  imageLoader: true,
  contentLoader: true,
  linkLoader: true,
  tagLoader: true,
  loadingProgress: 0,
};

const reportLoaderSlice = createSlice({
  name: 'reportLoader',
  initialState,
  reducers: {
    setScoreLoader(state, action) {
      state.scoreLoader = action.payload;
    },
    setUrlLoader(state, action) {
      state.urlLoader = action.payload;
    },
    setTitlemetaLoader(state, action) {
      state.titlemetaLoader = action.payload;
    },
    setImageLoader(state, action) {
      state.imageLoader = action.payload;
    },
    setContentLoader(state, action) {
      state.contentLoader = action.payload;
    },
    setLinkLoader(state, action) {
      state.linkLoader = action.payload;
    },
    setTagLoader(state, action) {
      state.tagLoader = action.payload;
    },
    setScreenshotLoader(state, action) {
      state.screenshotLoader = action.payload;
    },
    setLoadingProgress(state, action) {
      state.loadingProgress = action.payload;
    }
  },
});

export const {
  setScoreLoader,
  setUrlLoader,
  setTitlemetaLoader,
  setImageLoader,
  setContentLoader,
  setLinkLoader,
  setTagLoader,
  setScreenshotLoader,
  setLoadingProgress,
} = reportLoaderSlice.actions;

export default reportLoaderSlice.reducer;
