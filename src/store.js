import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { localStorageMiddleware } from "./localStorageMiddleware";

const initialState = JSON.parse(localStorage.getItem("reduxState")) || {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: [
    ...getDefaultMiddleware(), // Include other middlewares here if needed
    localStorageMiddleware,
  ],
});

export default store;
