// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
