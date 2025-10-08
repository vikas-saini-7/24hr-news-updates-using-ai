import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://two4hr-news-updates-using-ai.onrender.com", // your local IP
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically for protected routes
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
