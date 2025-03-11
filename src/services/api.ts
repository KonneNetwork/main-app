import axios from "axios";

export const api = axios.create({
  // baseURL: "http://192.168.1.48:8089/",
  baseURL: "https://konne-api.onrender.com/",
})