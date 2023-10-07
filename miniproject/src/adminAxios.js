import axios from "axios";
import getCookies from "./helpers/getCookies";

const instance = axios.create({
  baseURL: "http://localhost:3001/admin",
});

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = getCookies()["admintoken"];
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
