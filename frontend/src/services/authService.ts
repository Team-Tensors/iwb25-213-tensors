import { apiClient, type ApiResponse, type AuthResponse, type LoginRequest, type RegisterRequest, type User } from './api';

export class AuthService {
  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
    }

    return response;
  }

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
    }

    return response;
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.request<User>('/auth/profile', {
      method: 'GET',
    });
  }

  /**
   * Update user profile
   */
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<void>> {
    return apiClient.request<void>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Logout user
   */
  logout(): void {
    apiClient.clearToken();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService();
