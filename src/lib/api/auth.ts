import type { ApiResponse } from '@/types/api-response';
import type { AuthStatusResponse } from '@/types/auth';

import { apiClient } from './client';

export const authApi = {
  checkAuth: async (): Promise<ApiResponse<AuthStatusResponse>> => {
    const response = await apiClient.get('/auth/me');

    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/auth/logout');

    return response.data;
  },
};
