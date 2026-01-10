import type { ApiSuccessResponse } from '@/types/api-response';
import type { CreateTemplateDto, TemplateResponseDto } from '@/types/template';

import { apiClient } from './client';

export const templateApi = {
  create: async (dto: CreateTemplateDto) => {
    const response =
      await apiClient.post<ApiSuccessResponse<TemplateResponseDto>>('/templates', dto);

    return response.data.data;
  },

  findAll: async () => {
    const response =
      await apiClient.get<ApiSuccessResponse<TemplateResponseDto[]>>('/templates');

    return response.data.data;
  },

  findOneById: async (id: string) => {
    const response =
      await apiClient.get<ApiSuccessResponse<TemplateResponseDto>>(`/templates/${id}`);

    return response.data.data;
  },

  update: async (id: string, dto: Partial<CreateTemplateDto>) => {
    const response =
      await apiClient.patch<ApiSuccessResponse<TemplateResponseDto>>(`/templates/${id}`, dto);

    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiSuccessResponse<void>>(`/templates/${id}`);

    return response.data.data;
  },
};
