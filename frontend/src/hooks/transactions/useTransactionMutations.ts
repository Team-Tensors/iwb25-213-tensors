import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { transactionService } from '../../services/TransactionService';
import type { 
  Transaction,
  ApiResponse
} from '../../services/api';

/**
 * Hook for creating a new transaction
 */
export const useCreateTransaction = (): UseMutationResult<ApiResponse<Transaction>, Error, Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: transactionService.createTransaction.bind(transactionService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * Hook for updating an existing transaction
 */
export const useUpdateTransaction = (): UseMutationResult<ApiResponse<Transaction>, Error, { id: number; data: Partial<Transaction> }> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => transactionService.updateTransaction(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * Hook for deleting a transaction
 */
export const useDeleteTransaction = (): UseMutationResult<ApiResponse<void>, Error, number> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: transactionService.deleteTransaction.bind(transactionService),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.removeQueries({ queryKey: ['transactions', id] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
