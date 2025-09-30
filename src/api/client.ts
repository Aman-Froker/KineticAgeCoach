import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ApiError } from "../types/api";
import { storage } from "./storage";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common response scenarios
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear stored auth data
      storage.removeToken();
      storage.removeUser();

      // Redirect to login or dispatch logout action
      window.location.href = "/login";

      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
    }

    // Transform error to our ApiError type
    const apiError: ApiError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      code: error.response?.data?.code || error.code,
      details: error.response?.data?.details,
    };

    return Promise.reject(apiError);
  }
);

export default apiClient;
