import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { accountService } from '../../services/AccountService';
import type { 
  Account,
  ApiResponse
} from '../../services/api';

/**
 * Hook for creating a new account
 */
export const useCreateAccount = (): UseMutationResult<ApiResponse<Account>, Error, Omit<Account, 'id' | 'user_id' | 'created_at' | 'updated_at'>> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: accountService.createAccount.bind(accountService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * Hook for updating an existing account
 */
export const useUpdateAccount = (): UseMutationResult<ApiResponse<Account>, Error, { id: number; data: Partial<Account> }> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => accountService.updateAccount(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * Hook for deleting an account
 */
export const useDeleteAccount = (): UseMutationResult<ApiResponse<void>, Error, number> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: accountService.deleteAccount.bind(accountService),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.removeQueries({ queryKey: ['accounts', id] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
