import { createSlice } from "@reduxjs/toolkit";
import { fetchRestaurantData } from "./googleMap.action";

export interface TodoProps {
  targettedRestaurant: string;
  address: string;
  restaurantName: string;
  distance: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export const initialState: TodoProps = {
  targettedRestaurant: "",
  address: "",
  restaurantName: "",
  distance: "",
  loading: false,
  error: false,
  errorMessage: "",
};

export const googleMapSlice = createSlice({
  name: "googleMap",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRestaurantData.pending.type]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = "";
    },
    [fetchRestaurantData.fulfilled.type]: (state, action) => {
      const payload = action.payload;
      if (payload.status === 200) {
        if (payload.result.length) {
          const random = Math.floor(Math.random() * payload.result.length);
          let target = payload.result[random];
          if (payload.sendFirstData) {
            target = payload.result[0];
          }
          const lattitude = target.location?.lat;
          const longitude = target.location?.lng;
          const targettedRestaurant = lattitude + ", " + longitude;
          state.targettedRestaurant = targettedRestaurant;
          state.distance = target.location.distance;
          state.address = target.location.formattedAddress.join(",");
          state.restaurantName = target.name;
        } else {
          state.error = true;
          state.errorMessage = " No Restaurant Found!!";
        }
      } else {
        state.error = true;
        state.errorMessage = payload.status + " " + payload.error + "";
      }
      state.loading = false;
    },
  },
});
