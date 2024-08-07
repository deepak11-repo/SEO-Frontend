// src/features/inputsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    url: null,
    primaryKeywords: null,
    secondaryKeywords: null,
    titleResponse: null,
    metaResponse: null,
    h1Response: null,
    h2Response: null,
    h3Response: null,
    h4Response: null,
    h5Response: null,
    h6Response: null,
    paragraphResponse: null,
    imageResponse: null,
    anchorResponse: null,
    linkResponse: null,
    urlResponse: null,
    techResponse: null,
    compilance: null,
};

const inputsSlice = createSlice({
    name: 'inputs',
    initialState,
    reducers: {
        setInputs(state, action) {
            const { url, primaryKeywords, secondaryKeywords } = action.payload;
            state.url = url;
            state.primaryKeywords = primaryKeywords;
            state.secondaryKeywords = secondaryKeywords;
        },
        setTitleResponse(state, action) {
            state.titleResponse = action.payload;
        },
        setMetaResponse(state, action) {
            state.metaResponse = action.payload;
        },
        setH1Response(state, action) {
            state.h1Response = action.payload;
        },
        setH2Response(state, action) {
            state.h2Response = action.payload;
        },
        setH3Response(state, action) {
            state.h3Response = action.payload;
        },
        setH4Response(state, action) {
            state.h4Response = action.payload;
        },
        setH5Response(state, action) {
            state.h5Response = action.payload;
        },
        setH6Response(state, action) {
            state.h6Response = action.payload;
        },
        setParagraphResponse(state, action) {
            state.paragraphResponse = action.payload;
        },
        setImageResponse(state, action) {
            state.imageResponse = action.payload;
        },
        setAnchorResponse(state, action) {
            state.anchorResponse = action.payload;
        },
        setLinkResponse(state, action) { 
            state.linkResponse = action.payload;
        },
        setUrlResponse(state, action) {
            state.urlResponse = action.payload;
        },
        setTechResponse(state, action) {
            state.techResponse = action.payload;
        },
        setComplianceResponse(state, action) {
            state.compilance = action.payload;
        },
    },
});

export const { setInputs, setTitleResponse, setMetaResponse, setH1Response, setH2Response, setH3Response, setH4Response, setH5Response, setH6Response, setParagraphResponse, setImageResponse, setAnchorResponse, setLinkResponse, setUrlResponse, setTechResponse, setComplianceResponse } = inputsSlice.actions;
export default inputsSlice.reducer;
