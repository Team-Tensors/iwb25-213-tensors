// API Base Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// API Client Class
class ApiClient {
  private baseURL: string;
  private token: string | null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    message: string;
    status_code: number;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

// Data Types
export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Account {
  id?: number;
  user_id: number;
  account_name: string;
  account_type: 'checking' | 'savings' | 'credit_card' | 'investment';
  balance: number;
  currency: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id?: number;
  user_id: number;
  account_id: number;
  category_id?: number;
  amount: number;
  description?: string;
  transaction_date: string;
  transaction_type: 'income' | 'expense' | 'transfer';
  status: 'pending' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface TransactionWithDetails extends Transaction {
  account_name?: string;
  category_name?: string;
  category_color?: string;
}

export interface Category {
  id?: number;
  user_id: number;
  name: string;
  type: 'income' | 'expense';
  color?: string;
  icon?: string;
  created_at?: string;
}

export interface Asset {
  id?: number;
  user_id: number;
  name: string;
  asset_type: 'real_estate' | 'vehicle' | 'investment' | 'other';
  current_value: number;
  purchase_value?: number;
  purchase_date?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Debt {
  id?: number;
  user_id: number;
  creditor_name: string;
  debt_type: 'mortgage' | 'personal_loan' | 'credit_card' | 'student_loan';
  principal_amount: number;
  current_balance: number;
  interest_rate?: number;
  monthly_payment?: number;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Budget {
  id?: number;
  user_id: number;
  category_id: number;
  budget_amount: number;
  spent_amount: number;
  budget_period: 'monthly' | 'yearly';
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface BudgetWithCategory extends Budget {
  category_name?: string;
  category_color?: string;
}

export interface DashboardStats {
  total_balance: number;
  monthly_income: number;
  monthly_expenses: number;
  net_worth: number;
  total_accounts: number;
  total_transactions: number;
  budget_utilization: number;
}

export interface MonthlyExpense {
  month: string;
  amount: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  color?: string;
}

export interface NetWorthData {
  date: string;
  assets: number;
  debts: number;
  net_worth: number;
}
