import { combineReducers } from "@reduxjs/toolkit";
import { googleMapSlice } from "./google-map/googleMap.slice";

const rootReducer = combineReducers({
  googleMap: googleMapSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
