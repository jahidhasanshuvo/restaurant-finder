import axios from "axios";

async function get(url, parameter, isMultipart) {
  return axios.get(url, {
    params: parameter,
    headers: {
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    },
  });
}
const AxiosServices = {
  get,
};
export default AxiosServices;
