import { apiClient, type ApiResponse, type Account, type PaginatedResponse } from './api';

export interface AccountParams {
  page?: number;
  limit?: number;
  account_type?: Account['account_type'];
  is_active?: boolean;
  sort_by?: 'account_name' | 'balance' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export class AccountService {
  /**
   * Get all accounts with pagination and filters
   */
  async getAccounts(params: AccountParams = {}): Promise<PaginatedResponse<Account>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/accounts?${queryString}` : '/accounts';

    return apiClient.request<PaginatedResponse<Account>['data']>(endpoint, {
      method: 'GET',
    }) as Promise<PaginatedResponse<Account>>;
  }

  /**
   * Get account by ID
   */
  async getAccount(id: number): Promise<ApiResponse<Account>> {
    return apiClient.request<Account>(`/accounts/${id}`, {
      method: 'GET',
    });
  }

  /**
   * Create new account
   */
  async createAccount(accountData: Omit<Account, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Account>> {
    return apiClient.request<Account>('/accounts', {
      method: 'POST',
      body: JSON.stringify(accountData),
    });
  }

  /**
   * Update account
   */
  async updateAccount(id: number, accountData: Partial<Account>): Promise<ApiResponse<Account>> {
    return apiClient.request<Account>(`/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(accountData),
    });
  }

  /**
   * Delete account
   */
  async deleteAccount(id: number): Promise<ApiResponse<void>> {
    return apiClient.request<void>(`/accounts/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Get active accounts only
   */
  async getActiveAccounts(): Promise<PaginatedResponse<Account>> {
    return this.getAccounts({
      is_active: true,
      sort_by: 'account_name',
      sort_order: 'asc',
    });
  }

  /**
   * Get accounts by type
   */
  async getAccountsByType(accountType: Account['account_type']): Promise<PaginatedResponse<Account>> {
    return this.getAccounts({
      account_type: accountType,
      is_active: true,
      sort_by: 'account_name',
      sort_order: 'asc',
    });
  }

  /**
   * Get account balance summary
   */
  async getAccountSummary(): Promise<ApiResponse<{
    total_balance: number;
    checking_balance: number;
    savings_balance: number;
    credit_card_balance: number;
    investment_balance: number;
    active_accounts: number;
  }>> {
    return apiClient.request<{
      total_balance: number;
      checking_balance: number;
      savings_balance: number;
      credit_card_balance: number;
      investment_balance: number;
      active_accounts: number;
    }>('/accounts/summary', {
      method: 'GET',
    });
  }

  /**
   * Update account balance
   */
  async updateAccountBalance(id: number, balance: number): Promise<ApiResponse<Account>> {
    return this.updateAccount(id, { balance });
  }

  /**
   * Deactivate account
   */
  async deactivateAccount(id: number): Promise<ApiResponse<Account>> {
    return this.updateAccount(id, { is_active: false });
  }

  /**
   * Activate account
   */
  async activateAccount(id: number): Promise<ApiResponse<Account>> {
    return this.updateAccount(id, { is_active: true });
  }
}

export const accountService = new AccountService();
