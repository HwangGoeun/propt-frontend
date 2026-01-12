import type { ApiResponse } from '@/types/api-response';
import type { AuthStatusResponse } from '@/types/auth';

import { apiClient } from './client';

export const authApi = {
  checkAuthStatus: async (): Promise<ApiResponse<AuthStatusResponse>> => {
    const response = await apiClient.get('/auth/me');

    // 백엔드에서 응답이 이중으로 래핑되어 오는 경우 처리
    if (response.data?.data?.ok && response.data?.data?.data) {
      return response.data.data;
    }

    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/auth/logout');

    return response.data;
  },

  guestLogin: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/auth/guest');

    return response.data;
  },
};
