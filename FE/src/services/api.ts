import axios from "axios";

// Ambil API URL dari environment variable (Vite)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
});
