import { apiClient, type ApiResponse, type Asset, type Debt, type Budget, type BudgetWithCategory, type PaginatedResponse } from './api';

export interface AssetParams {
  page?: number;
  limit?: number;
  asset_type?: Asset['asset_type'];
  sort_by?: 'name' | 'current_value' | 'purchase_date' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export interface DebtParams {
  page?: number;
  limit?: number;
  debt_type?: Debt['debt_type'];
  sort_by?: 'creditor_name' | 'current_balance' | 'due_date' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export interface BudgetParams {
  page?: number;
  limit?: number;
  budget_period?: Budget['budget_period'];
  category_id?: number;
  sort_by?: 'budget_amount' | 'spent_amount' | 'start_date' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export class AssetService {
  async getAssets(params: AssetParams = {}): Promise<PaginatedResponse<Asset>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/assets?${queryString}` : '/assets';

    return apiClient.request<PaginatedResponse<Asset>['data']>(endpoint, {
      method: 'GET',
    }) as Promise<PaginatedResponse<Asset>>;
  }

  async getAsset(id: number): Promise<ApiResponse<Asset>> {
    return apiClient.request<Asset>(`/assets/${id}`, {
      method: 'GET',
    });
  }

  async createAsset(assetData: Omit<Asset, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Asset>> {
    return apiClient.request<Asset>('/assets', {
      method: 'POST',
      body: JSON.stringify(assetData),
    });
  }

  async updateAsset(id: number, assetData: Partial<Asset>): Promise<ApiResponse<Asset>> {
    return apiClient.request<Asset>(`/assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(assetData),
    });
  }

  async deleteAsset(id: number): Promise<ApiResponse<void>> {
    return apiClient.request<void>(`/assets/${id}`, {
      method: 'DELETE',
    });
  }

  async getAssetsByType(assetType: Asset['asset_type']): Promise<PaginatedResponse<Asset>> {
    return this.getAssets({
      asset_type: assetType,
      sort_by: 'current_value',
      sort_order: 'desc',
    });
  }

  async getTotalAssetValue(): Promise<ApiResponse<{ total_value: number }>> {
    return apiClient.request<{ total_value: number }>('/assets/total-value', {
      method: 'GET',
    });
  }
}

export class DebtService {
  async getDebts(params: DebtParams = {}): Promise<PaginatedResponse<Debt>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/debts?${queryString}` : '/debts';

    return apiClient.request<PaginatedResponse<Debt>['data']>(endpoint, {
      method: 'GET',
    }) as Promise<PaginatedResponse<Debt>>;
  }

  async getDebt(id: number): Promise<ApiResponse<Debt>> {
    return apiClient.request<Debt>(`/debts/${id}`, {
      method: 'GET',
    });
  }

  async createDebt(debtData: Omit<Debt, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Debt>> {
    return apiClient.request<Debt>('/debts', {
      method: 'POST',
      body: JSON.stringify(debtData),
    });
  }

  async updateDebt(id: number, debtData: Partial<Debt>): Promise<ApiResponse<Debt>> {
    return apiClient.request<Debt>(`/debts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(debtData),
    });
  }

  async deleteDebt(id: number): Promise<ApiResponse<void>> {
    return apiClient.request<void>(`/debts/${id}`, {
      method: 'DELETE',
    });
  }

  async getDebtsByType(debtType: Debt['debt_type']): Promise<PaginatedResponse<Debt>> {
    return this.getDebts({
      debt_type: debtType,
      sort_by: 'current_balance',
      sort_order: 'desc',
    });
  }

  async getTotalDebtAmount(): Promise<ApiResponse<{ total_debt: number }>> {
    return apiClient.request<{ total_debt: number }>('/debts/total-amount', {
      method: 'GET',
    });
  }
}

export class BudgetService {
  async getBudgets(params: BudgetParams = {}): Promise<PaginatedResponse<BudgetWithCategory>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/budgets?${queryString}` : '/budgets';

    return apiClient.request<PaginatedResponse<BudgetWithCategory>['data']>(endpoint, {
      method: 'GET',
    }) as Promise<PaginatedResponse<BudgetWithCategory>>;
  }

  async getBudget(id: number): Promise<ApiResponse<BudgetWithCategory>> {
    return apiClient.request<BudgetWithCategory>(`/budgets/${id}`, {
      method: 'GET',
    });
  }

  async createBudget(budgetData: Omit<Budget, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Budget>> {
    return apiClient.request<Budget>('/budgets', {
      method: 'POST',
      body: JSON.stringify(budgetData),
    });
  }

  async updateBudget(id: number, budgetData: Partial<Budget>): Promise<ApiResponse<Budget>> {
    return apiClient.request<Budget>(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(budgetData),
    });
  }

  async deleteBudget(id: number): Promise<ApiResponse<void>> {
    return apiClient.request<void>(`/budgets/${id}`, {
      method: 'DELETE',
    });
  }

  async getCurrentMonthBudgets(): Promise<PaginatedResponse<BudgetWithCategory>> {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return apiClient.request<PaginatedResponse<BudgetWithCategory>['data']>(`/budgets/period?start_date=${firstDay.toISOString().split('T')[0]}&end_date=${lastDay.toISOString().split('T')[0]}`, {
      method: 'GET',
    }) as Promise<PaginatedResponse<BudgetWithCategory>>;
  }
}

export const assetService = new AssetService();
export const debtService = new DebtService();
export const budgetService = new BudgetService();
