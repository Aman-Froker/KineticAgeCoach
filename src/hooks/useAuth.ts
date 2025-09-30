import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { authService } from "../api/services/auth";
import { storage } from "../api/storage";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
} from "../types/auth";
import { ApiError } from "../types/api";

interface UseAuthReturn {
  // Query data
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: ApiError | null;

  // Mutation functions
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<User>;

  // Mutation states
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isRegistering: boolean;

  // Errors
  loginError: ApiError | null;
  logoutError: ApiError | null;
  registerError: ApiError | null;
}

export const useAuth = (): UseAuthReturn => {
  const queryClient = useQueryClient();

  const loginMutation: UseMutationResult<
    AuthResponse,
    ApiError,
    LoginCredentials
  > = useMutation({
    mutationFn: authService.login,
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(["currentUser"], data.user);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const logoutMutation: UseMutationResult<void, ApiError, void> = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const registerMutation: UseMutationResult<User, ApiError, RegisterData> =
    useMutation({
      mutationFn: authService.register,
    });

  const currentUserQuery: UseQueryResult<User, ApiError> = useQuery({
    queryKey: ["currentUser"],
    queryFn: authService.getCurrentUser,
    enabled: !!storage.getToken(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    // Query data
    user: currentUserQuery.data,
    isLoading: currentUserQuery.isLoading,
    isAuthenticated: !!storage.getToken() && !!currentUserQuery.data,
    error: currentUserQuery.error,

    // Mutation functions
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    register: registerMutation.mutateAsync,

    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isRegistering: registerMutation.isPending,

    // Errors
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    registerError: registerMutation.error,
  };
};
