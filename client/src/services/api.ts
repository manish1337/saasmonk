import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9000/api", // Adjust this to match your backend URL
});
