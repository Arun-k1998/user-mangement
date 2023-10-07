import axios from "axios";
import getCookies from "./helpers/getCookies";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    config.headers.Authorization = getCookies()["token"];

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
