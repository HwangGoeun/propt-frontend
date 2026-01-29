import type { ApiResponse } from '@/types/api-response';
import type { AuthStatusResponse } from '@/types/auth';

import { apiClient } from './client';

export const authApi = {
  checkAuthStatus: async (): Promise<ApiResponse<AuthStatusResponse>> => {
    const response = await apiClient.get('/auth/me');

    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/auth/logout');

    return response.data;
  },

  guestLogin: async (state: string | null): Promise<ApiResponse<{ code: string | null }>> => {
    const body = state ? { state } : {};
    const response = await apiClient.post('/auth/guest', body);

    return response.data;
  },

  generateMcpCode: async (): Promise<ApiResponse<{ code: string }>> => {
    const response = await apiClient.post('/auth/code/generate');

    return response.data;
  },

  checkMcpCodeStatus: async (code: string): Promise<ApiResponse<{ used: boolean }>> => {
    const response = await apiClient.get(`/mcp/code/status?code=${code}`);

    return response.data;
  },

  updateOnboarding: async (completed: boolean): Promise<ApiResponse<void>> => {
    const response = await apiClient.patch('/auth/onboarding', { completed });

    return response.data;
  },
};
