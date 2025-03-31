// src/api/axiosPublic.js
import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://book-store-generator-server.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
