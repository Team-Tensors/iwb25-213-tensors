import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import { transactionService } from '../../services/transactionService';
import type { 
  TransactionWithDetails,
  ApiResponse,
  PaginatedResponse
} from '../../services/api';
import type { TransactionParams } from '../../services/transactionService';

/**
 * Hook for fetching paginated transactions with optional filters
 */
export const useTransactions = (params: TransactionParams = {}): UseQueryResult<PaginatedResponse<TransactionWithDetails>, Error> => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionService.getTransactions(params),
    enabled: authService.isAuthenticated(),
  });
};

/**
 * Hook for fetching a single transaction by ID
 */
export const useTransaction = (id: number): UseQueryResult<ApiResponse<TransactionWithDetails>, Error> => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => transactionService.getTransaction(id),
    enabled: authService.isAuthenticated() && !!id,
  });
};

/**
 * Hook for fetching recent transactions
 */
export const useRecentTransactions = (limit: number = 10): UseQueryResult<PaginatedResponse<TransactionWithDetails>, Error> => {
  return useQuery({
    queryKey: ['transactions', 'recent', limit],
    queryFn: () => transactionService.getRecentTransactions(limit),
    enabled: authService.isAuthenticated(),
  });
};
