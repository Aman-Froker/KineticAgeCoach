import { AxiosResponse } from "axios";
import apiClient from "../client";
import { User } from "../../types/auth";
import { PaginatedResponse, QueryParams } from "../../types/api";
import { CreateUserData, UpdateUserData } from "@/types/user";

export interface UserService {
  getUsers: (params?: QueryParams) => Promise<PaginatedResponse<User>>;
  getUser: (id: string) => Promise<User>;
  createUser: (userData: CreateUserData) => Promise<User>;
  updateUser: (id: string, userData: UpdateUserData) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}

export const userService: UserService = {
  getUsers: async (
    params: QueryParams = {}
  ): Promise<PaginatedResponse<User>> => {
    const response: AxiosResponse<PaginatedResponse<User>> =
      await apiClient.get("/users", { params });
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response: AxiosResponse<User> = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    const response: AxiosResponse<User> = await apiClient.post(
      "/users",
      userData
    );
    return response.data;
  },

  updateUser: async (id: string, userData: UpdateUserData): Promise<User> => {
    const response: AxiosResponse<User> = await apiClient.put(
      `/users/${id}`,
      userData
    );
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
