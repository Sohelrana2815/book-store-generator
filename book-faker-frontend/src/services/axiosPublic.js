import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000, // timeout after 10 second
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
