import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const middleware =
  process.env.NODE_ENV === "production" ? [thunk] : [thunk, logger];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
