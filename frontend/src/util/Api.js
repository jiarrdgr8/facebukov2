import axios from "axios";
import config from "config";

export const httpClient = axios.create({
  baseURL: config.API_URL, //YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
    // 'x-requested-with': 'net.qwizard.android',
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
