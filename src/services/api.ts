import axios from "axios";

export const api = axios.create({
  // baseURL: "http://192.168.1.48:3333/",
  baseURL: "https://konne-api.onrender.com/",
})