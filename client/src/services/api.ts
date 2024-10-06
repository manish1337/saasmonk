import axios from "axios";

export const api = axios.create({
  baseURL: "https://saasmonk-sexg.onrender.com/api", // Adjust this to match your backend URL
});
