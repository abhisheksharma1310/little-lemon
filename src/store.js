
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Import your reducers here

const store = configureStore({
  reducer: rootReducer,
  // Additional middleware and options can be configured here
});

export default store;
