// actionsAndReducer.js
import { createSlice } from '@reduxjs/toolkit';

// Create a slice of the Redux store
const scoreSlice = createSlice({
  name: 'scores',
  initialState: {
    mobileScore: null,
    desktopScore: null,
    techScore: 0, 
    pageScore: 0, 
    screenshot: null,
    internalLinks: null,
    altKeyword: null,
    metaTag: null,
    urlReport: null,
    titleMeta: null,
    content: null,
  },
  reducers: {
    setMobileScore(state, action) {
      state.mobileScore = action.payload;
    },
    setDesktopScore(state, action) {
      state.desktopScore = action.payload;
    },
    addTechScore(state, action) {
      state.techScore += action.payload;
    },
    addPageScore(state, action) {
      state.pageScore += action.payload;
    },
    setScreenshot(state, action) {
      state.screenshot = action.payload;
    },
    setInternalLink(state, action) {
      state.internalLinks = action.payload;
    }, 
    setAltKeyword(state, action) {
      state.altKeyword = action.payload;
    },
    setMetaTag(state, action) {
      state.metaTag = action.payload;
    }, 
    setURLReport(state, action) {
      state.urlReport = action.payload;
    },
    setTitleMeta(state, action) {
      state.titleMeta = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    }, 
  },
});

// Export actions
export const { setMobileScore, setDesktopScore, addTechScore, addPageScore, setScreenshot, setInternalLink, setAltKeyword, setMetaTag, setURLReport, setTitleMeta, setContent } = scoreSlice.actions;

// Export reducer
export default scoreSlice.reducer;
