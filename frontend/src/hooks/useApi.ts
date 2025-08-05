import { useMutation, useQuery, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { transactionService } from '../services/transactionService';
import { accountService } from '../services/accountService';
import type { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  ApiResponse,
  Transaction,
  TransactionWithDetails,
  Account,
  PaginatedResponse
} from '../services/api';
import type { TransactionParams } from '../services/transactionService';
import type { AccountParams } from '../services/accountService';

// Auth Hooks
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

export const useProfile = (): UseQueryResult<ApiResponse<User>, Error> => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: authService.getProfile.bind(authService),
    enabled: authService.isAuthenticated(),
  });
};

export const useUpdateProfile = (): UseMutationResult<ApiResponse<void>, Error, Partial<User>> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.updateProfile.bind(authService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
};

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

// Transaction Hooks
export const useTransactions = (params: TransactionParams = {}): UseQueryResult<PaginatedResponse<TransactionWithDetails>, Error> => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionService.getTransactions(params),
    enabled: authService.isAuthenticated(),
  });
};

export const useTransaction = (id: number): UseQueryResult<ApiResponse<TransactionWithDetails>, Error> => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => transactionService.getTransaction(id),
    enabled: authService.isAuthenticated() && !!id,
  });
};

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

export const useRecentTransactions = (limit: number = 10): UseQueryResult<PaginatedResponse<TransactionWithDetails>, Error> => {
  return useQuery({
    queryKey: ['transactions', 'recent', limit],
    queryFn: () => transactionService.getRecentTransactions(limit),
    enabled: authService.isAuthenticated(),
  });
};

// Account Hooks
export const useAccounts = (params: AccountParams = {}): UseQueryResult<PaginatedResponse<Account>, Error> => {
  return useQuery({
    queryKey: ['accounts', params],
    queryFn: () => accountService.getAccounts(params),
    enabled: authService.isAuthenticated(),
  });
};

export const useAccount = (id: number): UseQueryResult<ApiResponse<Account>, Error> => {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: () => accountService.getAccount(id),
    enabled: authService.isAuthenticated() && !!id,
  });
};

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

export const useActiveAccounts = (): UseQueryResult<PaginatedResponse<Account>, Error> => {
  return useQuery({
    queryKey: ['accounts', 'active'],
    queryFn: accountService.getActiveAccounts.bind(accountService),
    enabled: authService.isAuthenticated(),
  });
};

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
