import axios from "axios";

export const callAxios = axios.create({
  baseURL: "http://211.217.226.59:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
