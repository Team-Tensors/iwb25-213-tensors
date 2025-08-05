import { useMutation, useQuery, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import type { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  ApiResponse
} from '../../services/api';

/**
 * Hook for user login
 */
export const useLogin = (): UseMutationResult<ApiResponse<AuthResponse>, Error, LoginRequest> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.login.bind(authService),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(['user'], data.data?.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};

/**
 * Hook for user registration
 */
export const useRegister = (): UseMutationResult<ApiResponse<AuthResponse>, Error, RegisterRequest> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.register.bind(authService),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(['user'], data.data?.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};

/**
 * Hook for getting user profile
 */
export const useProfile = (): UseQueryResult<ApiResponse<User>, Error> => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: authService.getProfile.bind(authService),
    enabled: authService.isAuthenticated(),
  });
};

/**
 * Hook for updating user profile
 */
export const useUpdateProfile = (): UseMutationResult<ApiResponse<void>, Error, Partial<User>> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.updateProfile.bind(authService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
