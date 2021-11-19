import { todayDateInYYYYMMDDFormat } from "../assets/scripts/home";

const {
  REACT_APP_FOURSQUARE_CLIENT_ID,
  REACT_APP_FOURSQUARE_CLIENT_SECRET,
  REACT_APP_FOURSQUARE_CATEGORY,
  REACT_APP_STARTING_POINT,
  REACT_APP_RADIUS_IN_METER,
} = process.env;

const ApiServices = {
  GET_NEAR_BY_RESTAURANT: (query: string) =>
    `https://api.foursquare.com/v2/venues/search?client_id=${REACT_APP_FOURSQUARE_CLIENT_ID}&client_secret=${REACT_APP_FOURSQUARE_CLIENT_SECRET}&ll=${REACT_APP_STARTING_POINT}&query=${query}&radius=${REACT_APP_RADIUS_IN_METER}&categoryId=${REACT_APP_FOURSQUARE_CATEGORY}&v=${todayDateInYYYYMMDDFormat()}`,
};
export default ApiServices;
