import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createWrapper } from '@/test/test-utils';
import type { CreateTemplateDto, TemplateResponseDto } from '@/types/template';

import { useCreateTemplate, useDeleteTemplate, useTemplate, useTemplates, useUpdateTemplate } from './use-templates';

vi.mock('@/lib/api/template', () => ({
  templateApi: {
    create: vi.fn(),
    findAll: vi.fn(),
    findOneById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

import { templateApi } from '@/lib/api/template';

describe('use-templates hooks', () => {
  const mockTemplate: TemplateResponseDto = {
    id: 'template-1',
    title: 'Test Template',
    content: 'Hello {name}!',
    variables: [{ name: 'name', description: null }],
    outputType: 'text',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('useTemplates', () => {
    it('템플릿 목록을 가져와야 한다', async () => {
      vi.mocked(templateApi.findAll).mockResolvedValue([mockTemplate]);

      const { result } = renderHook(() => useTemplates(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([mockTemplate]);
      expect(templateApi.findAll).toHaveBeenCalledTimes(1);
    });

    it('빈 목록을 처리해야 한다', async () => {
      vi.mocked(templateApi.findAll).mockResolvedValue([]);

      const { result } = renderHook(() => useTemplates(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });

    it('에러를 처리해야 한다', async () => {
      vi.mocked(templateApi.findAll).mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useTemplates(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });

  describe('useTemplate', () => {
    it('ID로 템플릿을 가져와야 한다', async () => {
      vi.mocked(templateApi.findOneById).mockResolvedValue(mockTemplate);

      const { result } = renderHook(() => useTemplate('template-1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTemplate);
      expect(templateApi.findOneById).toHaveBeenCalledWith('template-1');
    });

    it('빈 ID일 때 쿼리가 비활성화되어야 한다', async () => {
      const { result } = renderHook(() => useTemplate(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(templateApi.findOneById).not.toHaveBeenCalled();
    });

    it('에러를 처리해야 한다', async () => {
      vi.mocked(templateApi.findOneById).mockRejectedValue(new Error('Not found'));

      const { result } = renderHook(() => useTemplate('non-existent'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('useCreateTemplate', () => {
    it('새 템플릿을 생성해야 한다', async () => {
      vi.mocked(templateApi.create).mockResolvedValue(mockTemplate);

      const { result } = renderHook(() => useCreateTemplate(), {
        wrapper: createWrapper(),
      });

      const createDto: CreateTemplateDto = {
        title: 'Test Template',
        content: 'Hello {name}!',
        variables: [{ name: 'name' }],
        outputType: 'text',
      };

      result.current.mutate(createDto);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(templateApi.create).toHaveBeenCalledWith(createDto, expect.anything());
      expect(result.current.data).toEqual(mockTemplate);
    });

    it('생성 에러를 처리해야 한다', async () => {
      vi.mocked(templateApi.create).mockRejectedValue(new Error('Creation failed'));

      const { result } = renderHook(() => useCreateTemplate(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        title: '',
        content: null,
        variables: [],
        outputType: null,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('useUpdateTemplate', () => {
    it('템플릿을 업데이트해야 한다', async () => {
      const updatedTemplate = { ...mockTemplate, title: 'Updated Title' };
      vi.mocked(templateApi.update).mockResolvedValue(updatedTemplate);

      const { result } = renderHook(() => useUpdateTemplate('template-1'), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ title: 'Updated Title' });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(templateApi.update).toHaveBeenCalledWith('template-1', { title: 'Updated Title' });
      expect(result.current.data).toEqual(updatedTemplate);
    });

    it('업데이트 에러를 처리해야 한다', async () => {
      vi.mocked(templateApi.update).mockRejectedValue(new Error('Update failed'));

      const { result } = renderHook(() => useUpdateTemplate('template-1'), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ title: 'New Title' });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('useDeleteTemplate', () => {
    it('템플릿을 삭제해야 한다', async () => {
      vi.mocked(templateApi.delete).mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteTemplate(), {
        wrapper: createWrapper(),
      });

      result.current.mutate('template-1');

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(templateApi.delete).toHaveBeenCalledWith('template-1', expect.anything());
    });

    it('삭제 에러를 처리해야 한다', async () => {
      vi.mocked(templateApi.delete).mockRejectedValue(new Error('Delete failed'));

      const { result } = renderHook(() => useDeleteTemplate(), {
        wrapper: createWrapper(),
      });

      result.current.mutate('template-1');

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });
});
