import axios from "axios";

export const callAxios = axios.create({
  baseURL: "http://61.73.36.38:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
