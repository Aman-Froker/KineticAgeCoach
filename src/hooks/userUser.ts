import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { userService } from "../api/services/users";
import { User } from "../types/auth";
import { PaginatedResponse, QueryParams, ApiError } from "../types/api";
import { CreateUserData, UpdateUserData } from "@/types/user";

// Hook for getting multiple users
export const useUsers = (
  params: QueryParams = {}
): UseQueryResult<PaginatedResponse<User>, ApiError> => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for getting a single user
export const useUser = (id: string): UseQueryResult<User, ApiError> => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getUser(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for creating a user
export const useCreateUser = (): UseMutationResult<
  User,
  ApiError,
  CreateUserData
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Hook for updating a user
interface UpdateUserVariables {
  id: string;
  userData: UpdateUserData;
}

export const useUpdateUser = (): UseMutationResult<
  User,
  ApiError,
  UpdateUserVariables
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: UpdateUserVariables) =>
      userService.updateUser(id, userData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

// Hook for deleting a user
export const useDeleteUser = (): UseMutationResult<void, ApiError, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
