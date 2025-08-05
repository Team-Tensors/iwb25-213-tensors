import { apiClient, type ApiResponse, type DashboardStats, type MonthlyExpense, type CategoryExpense, type NetWorthData } from './api';

export interface AnalyticsDateRange {
  start_date: string;
  end_date: string;
}

export interface ExpenseAnalytics {
  total_expenses: number;
  average_daily_expense: number;
  category_breakdown: CategoryExpense[];
  monthly_trend: MonthlyExpense[];
}

export interface IncomeAnalytics {
  total_income: number;
  average_monthly_income: number;
  income_sources: CategoryExpense[];
  monthly_trend: MonthlyExpense[];
}

export interface NetWorthAnalytics {
  current_net_worth: number;
  net_worth_change: number;
  net_worth_change_percentage: number;
  historical_data: NetWorthData[];
}

export class AnalyticsService {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.request<DashboardStats>('/analytics/dashboard', {
      method: 'GET',
    });
  }

  /**
   * Get monthly expenses data
   */
  async getMonthlyExpenses(dateRange?: AnalyticsDateRange): Promise<ApiResponse<MonthlyExpense[]>> {
    let endpoint = '/analytics/expenses/monthly';
    
    if (dateRange) {
      const params = new URLSearchParams({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      });
      endpoint += `?${params.toString()}`;
    }

    return apiClient.request<MonthlyExpense[]>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get expenses by category
   */
  async getExpensesByCategory(dateRange?: AnalyticsDateRange): Promise<ApiResponse<CategoryExpense[]>> {
    let endpoint = '/analytics/expenses/by-category';
    
    if (dateRange) {
      const params = new URLSearchParams({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      });
      endpoint += `?${params.toString()}`;
    }

    return apiClient.request<CategoryExpense[]>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get net worth data
   */
  async getNetWorthData(dateRange?: AnalyticsDateRange): Promise<ApiResponse<NetWorthData[]>> {
    let endpoint = '/analytics/networth';
    
    if (dateRange) {
      const params = new URLSearchParams({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      });
      endpoint += `?${params.toString()}`;
    }

    return apiClient.request<NetWorthData[]>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get comprehensive expense analytics
   */
  async getExpenseAnalytics(dateRange?: AnalyticsDateRange): Promise<ApiResponse<ExpenseAnalytics>> {
    let endpoint = '/analytics/expenses/comprehensive';
    
    if (dateRange) {
      const params = new URLSearchParams({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      });
      endpoint += `?${params.toString()}`;
    }

    return apiClient.request<ExpenseAnalytics>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get comprehensive income analytics
   */
  async getIncomeAnalytics(dateRange?: AnalyticsDateRange): Promise<ApiResponse<IncomeAnalytics>> {
    let endpoint = '/analytics/income/comprehensive';
    
    if (dateRange) {
      const params = new URLSearchParams({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      });
      endpoint += `?${params.toString()}`;
    }

    return apiClient.request<IncomeAnalytics>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get net worth analytics
   */
  async getNetWorthAnalytics(months: number = 12): Promise<ApiResponse<NetWorthAnalytics>> {
    return apiClient.request<NetWorthAnalytics>(`/analytics/networth/comprehensive?months=${months}`, {
      method: 'GET',
    });
  }

  /**
   * Get budget performance
   */
  async getBudgetPerformance(month?: string): Promise<ApiResponse<{
    total_budgeted: number;
    total_spent: number;
    utilization_percentage: number;
    over_budget_categories: number;
    under_budget_categories: number;
    categories: Array<{
      category_name: string;
      budgeted: number;
      spent: number;
      percentage: number;
      status: 'over' | 'under' | 'on_track';
    }>;
  }>> {
    let endpoint = '/analytics/budget/performance';
    
    if (month) {
      endpoint += `?month=${month}`;
    }

    return apiClient.request<{
      total_budgeted: number;
      total_spent: number;
      utilization_percentage: number;
      over_budget_categories: number;
      under_budget_categories: number;
      categories: Array<{
        category_name: string;
        budgeted: number;
        spent: number;
        percentage: number;
        status: 'over' | 'under' | 'on_track';
      }>;
    }>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get spending trends
   */
  async getSpendingTrends(period: 'weekly' | 'monthly' | 'yearly' = 'monthly', limit: number = 12): Promise<ApiResponse<{
    period: string;
    trends: Array<{
      period_label: string;
      total_amount: number;
      transaction_count: number;
      average_transaction: number;
      top_categories: CategoryExpense[];
    }>;
  }>> {
    return apiClient.request<{
      period: string;
      trends: Array<{
        period_label: string;
        total_amount: number;
        transaction_count: number;
        average_transaction: number;
        top_categories: CategoryExpense[];
      }>;
    }>(`/analytics/spending/trends?period=${period}&limit=${limit}`, {
      method: 'GET',
    });
  }

  /**
   * Get financial health score
   */
  async getFinancialHealthScore(): Promise<ApiResponse<{
    overall_score: number;
    savings_rate_score: number;
    debt_to_income_score: number;
    emergency_fund_score: number;
    budget_adherence_score: number;
    diversification_score: number;
    recommendations: string[];
  }>> {
    return apiClient.request<{
      overall_score: number;
      savings_rate_score: number;
      debt_to_income_score: number;
      emergency_fund_score: number;
      budget_adherence_score: number;
      diversification_score: number;
      recommendations: string[];
    }>('/analytics/financial-health', {
      method: 'GET',
    });
  }
}

export const analyticsService = new AnalyticsService();
