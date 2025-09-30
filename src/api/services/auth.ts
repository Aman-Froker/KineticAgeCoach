import { AxiosResponse } from "axios";
import apiClient from "../client";
import { storage } from "../storage";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  RefreshTokenResponse,
} from "../../types/auth";

export interface AuthService {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<User>;
  refreshToken: () => Promise<RefreshTokenResponse>;
  getCurrentUser: () => Promise<User>;
}

export const authService: AuthService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await apiClient.post(
      "/auth/login",
      credentials
    );
    const { token, refreshToken, user } = response.data;

    storage.setToken(token);
    storage.setRefreshToken(refreshToken);
    storage.setUser(user);

    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      storage.clearAll();
    }
  },

  register: async (userData: RegisterData): Promise<User> => {
    const response: AxiosResponse<User> = await apiClient.post(
      "/auth/register",
      userData
    );
    return response.data;
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response: AxiosResponse<RefreshTokenResponse> = await apiClient.post(
      "/auth/refresh",
      { refreshToken }
    );
    const { token } = response.data;

    storage.setToken(token);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response: AxiosResponse<User> = await apiClient.get("/auth/me");
    storage.setUser<User>(response.data);
    return response.data;
  },
};
