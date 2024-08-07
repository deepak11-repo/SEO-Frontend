// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import inputsReducer from './utility/inputsSlice';
import loaderReducer from './utility/loaderSlice';
import scoreReducer from './utility/scoreSlice';
import reportLoaderReducer from './utility/reportLoaderSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['inputs'],
};

const persistedInputsReducer = persistReducer(persistConfig, inputsReducer);

// Configure store
const store = configureStore({
  reducer: {
    inputs: persistedInputsReducer,
    loader: loaderReducer,
    scores: scoreReducer,
    reportLoader: reportLoaderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks
    }),
});

export const persistor = persistStore(store);
export default store;
