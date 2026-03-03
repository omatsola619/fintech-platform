import axios from "axios";

export const api = axios.create({
  baseURL: "https://payinfraterminal.onrender.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
