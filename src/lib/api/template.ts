
import type { ApiSuccessResponse } from '@/types/api-response';
import type { TemplateResponseDto } from '@/types/template';

import { apiClient } from './client';

export const templateApi = {
  findAll: async () => {
    const response =
      await apiClient.get<ApiSuccessResponse<TemplateResponseDto[]>>('/templates');

    return response.data.data;
  },
};
