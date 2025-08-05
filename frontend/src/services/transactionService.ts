import { apiClient, type ApiResponse, type Transaction, type TransactionWithDetails, type PaginatedResponse } from './api';

export interface TransactionFilters {
  account_id?: number;
  category_id?: number;
  transaction_type?: 'income' | 'expense' | 'transfer';
  status?: 'pending' | 'completed' | 'cancelled';
  start_date?: string;
  end_date?: string;
  min_amount?: number;
  max_amount?: number;
}

export interface TransactionParams extends TransactionFilters {
  page?: number;
  limit?: number;
  sort_by?: 'transaction_date' | 'amount' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export class TransactionService {
  /**
   * Get all transactions with pagination and filters
   */
  async getTransactions(params: TransactionParams = {}): Promise<PaginatedResponse<TransactionWithDetails>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/transactions?${queryString}` : '/transactions';

    return apiClient.request<PaginatedResponse<TransactionWithDetails>['data']>(endpoint, {
      method: 'GET',
    }) as Promise<PaginatedResponse<TransactionWithDetails>>;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(id: number): Promise<ApiResponse<TransactionWithDetails>> {
    return apiClient.request<TransactionWithDetails>(`/transactions/${id}`, {
      method: 'GET',
    });
  }

  /**
   * Create new transaction
   */
  async createTransaction(transactionData: Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Transaction>> {
    return apiClient.request<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  }

  /**
   * Update transaction
   */
  async updateTransaction(id: number, transactionData: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    return apiClient.request<Transaction>(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData),
    });
  }

  /**
   * Delete transaction
   */
  async deleteTransaction(id: number): Promise<ApiResponse<void>> {
    return apiClient.request<void>(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Get recent transactions
   */
  async getRecentTransactions(limit: number = 10): Promise<PaginatedResponse<TransactionWithDetails>> {
    return this.getTransactions({
      limit,
      sort_by: 'transaction_date',
      sort_order: 'desc',
    });
  }

  /**
   * Get transactions by date range
   */
  async getTransactionsByDateRange(startDate: string, endDate: string): Promise<PaginatedResponse<TransactionWithDetails>> {
    return this.getTransactions({
      start_date: startDate,
      end_date: endDate,
      sort_by: 'transaction_date',
      sort_order: 'desc',
    });
  }

  /**
   * Get transactions by category
   */
  async getTransactionsByCategory(categoryId: number): Promise<PaginatedResponse<TransactionWithDetails>> {
    return this.getTransactions({
      category_id: categoryId,
      sort_by: 'transaction_date',
      sort_order: 'desc',
    });
  }

  /**
   * Get transactions by account
   */
  async getTransactionsByAccount(accountId: number): Promise<PaginatedResponse<TransactionWithDetails>> {
    return this.getTransactions({
      account_id: accountId,
      sort_by: 'transaction_date',
      sort_order: 'desc',
    });
  }
}

export const transactionService = new TransactionService();
