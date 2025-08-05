import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import { accountService } from '../../services/accountService';
import type { 
  Account,
  ApiResponse,
  PaginatedResponse
} from '../../services/api';
import type { AccountParams } from '../../services/accountService';

/**
 * Hook for fetching paginated accounts with optional filters
 */
export const useAccounts = (params: AccountParams = {}): UseQueryResult<PaginatedResponse<Account>, Error> => {
  return useQuery({
    queryKey: ['accounts', params],
    queryFn: () => accountService.getAccounts(params),
    enabled: authService.isAuthenticated(),
  });
};

/**
 * Hook for fetching a single account by ID
 */
export const useAccount = (id: number): UseQueryResult<ApiResponse<Account>, Error> => {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: () => accountService.getAccount(id),
    enabled: authService.isAuthenticated() && !!id,
  });
};

/**
 * Hook for fetching active accounts only
 */
export const useActiveAccounts = (): UseQueryResult<PaginatedResponse<Account>, Error> => {
  return useQuery({
    queryKey: ['accounts', 'active'],
    queryFn: accountService.getActiveAccounts.bind(accountService),
    enabled: authService.isAuthenticated(),
  });
};

/**
 * Hook for fetching account summary statistics
 */
export const useAccountSummary = (): UseQueryResult<ApiResponse<{
  total_balance: number;
  checking_balance: number;
  savings_balance: number;
  credit_card_balance: number;
  investment_balance: number;
  active_accounts: number;
}>, Error> => {
  return useQuery({
    queryKey: ['accounts', 'summary'],
    queryFn: accountService.getAccountSummary.bind(accountService),
    enabled: authService.isAuthenticated(),
  });
};
