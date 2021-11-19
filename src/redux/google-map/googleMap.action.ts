import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiServices from "../../networks/ApiServices";
import AxiosServices from "../../networks/AxiosService";

// asyncThunk generate three extraReducers
export const fetchRestaurantData = createAsyncThunk(
  "gmap/getLocation",
  async (keyword: string) => {
    try {
      const result = await AxiosServices.get(
        ApiServices.GET_NEAR_BY_RESTAURANT(encodeURIComponent(keyword))
      )
        .then((res: any) => {
          const result = res.data?.response?.venues;
          if (keyword.length && result.length) {
            return { result, status: 200, sendFirstData: true };
          }
          return { result, status: 200 };
        })
        .catch((error) => {
          return { error: error, status: error.response.status };
        });
      return result;
    } catch (error) {
      return { error: error, status: 500 };
    }
  }
);
