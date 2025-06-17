import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Public API instance (no authentication required)
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

// Private API instance (for authenticated requests)
const axiosPrivate = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { api, axiosPrivate };