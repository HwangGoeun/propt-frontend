import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { CreateTemplateDto, TemplateResponseDto } from '@/types/template';

import { apiClient } from './client';
import { templateApi } from './template';

describe('templateApi', () => {
  let mock: MockAdapter;

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
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('create', () => {
    it('새 템플릿을 생성해야 한다', async () => {
      const createDto: CreateTemplateDto = {
        title: 'New Template',
        content: 'Hello {name}!',
        variables: [{ name: 'name' }],
        outputType: 'text',
      };
      mock.onPost('/templates', createDto).reply(201, { ok: true, data: mockTemplate });

      const result = await templateApi.create(createDto);

      expect(result).toEqual(mockTemplate);
    });

    it('에러 발생 시 예외를 던져야 한다', async () => {
      const createDto: CreateTemplateDto = {
        title: '',
        content: null,
        variables: [],
        outputType: null,
      };
      mock.onPost('/templates').reply(400, { message: '제목은 필수입니다' });

      await expect(templateApi.create(createDto)).rejects.toThrow('제목은 필수입니다');
    });
  });

  describe('findAll', () => {
    it('모든 템플릿 목록을 반환해야 한다', async () => {
      const templates = [mockTemplate, { ...mockTemplate, id: 'template-2' }];
      mock.onGet('/templates').reply(200, { ok: true, data: templates });

      const result = await templateApi.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('template-1');
    });

    it('빈 목록을 반환할 수 있어야 한다', async () => {
      mock.onGet('/templates').reply(200, { ok: true, data: [] });

      const result = await templateApi.findAll();

      expect(result).toEqual([]);
    });

    it('에러 발생 시 예외를 던져야 한다', async () => {
      mock.onGet('/templates').reply(500, { message: '서버 오류' });

      await expect(templateApi.findAll()).rejects.toThrow('서버 오류');
    });
  });

  describe('findOneById', () => {
    it('ID로 템플릿을 조회해야 한다', async () => {
      mock.onGet('/templates/template-1').reply(200, { ok: true, data: mockTemplate });

      const result = await templateApi.findOneById('template-1');

      expect(result).toEqual(mockTemplate);
    });

    it('존재하지 않는 ID로 조회 시 에러를 던져야 한다', async () => {
      mock.onGet('/templates/non-existent').reply(404, { message: '템플릿을 찾을 수 없습니다' });

      await expect(templateApi.findOneById('non-existent')).rejects.toThrow(
        '템플릿을 찾을 수 없습니다',
      );
    });
  });

  describe('update', () => {
    it('템플릿을 업데이트해야 한다', async () => {
      const updateDto = { title: 'Updated Title' };
      const updatedTemplate = { ...mockTemplate, title: 'Updated Title' };
      mock.onPatch('/templates/template-1', updateDto).reply(200, { ok: true, data: updatedTemplate });

      const result = await templateApi.update('template-1', updateDto);

      expect(result.title).toBe('Updated Title');
    });

    it('여러 필드를 동시에 업데이트할 수 있어야 한다', async () => {
      const updateDto = { title: 'New Title', content: 'New Content' };
      const updatedTemplate = { ...mockTemplate, ...updateDto };
      mock.onPatch('/templates/template-1', updateDto).reply(200, { ok: true, data: updatedTemplate });

      const result = await templateApi.update('template-1', updateDto);

      expect(result.title).toBe('New Title');
      expect(result.content).toBe('New Content');
    });

    it('존재하지 않는 ID로 업데이트 시 에러를 던져야 한다', async () => {
      mock.onPatch('/templates/non-existent').reply(404, { message: '템플릿을 찾을 수 없습니다' });

      await expect(templateApi.update('non-existent', { title: 'Test' })).rejects.toThrow(
        '템플릿을 찾을 수 없습니다',
      );
    });
  });

  describe('delete', () => {
    it('템플릿을 삭제해야 한다', async () => {
      mock.onDelete('/templates/template-1').reply(200, { ok: true, data: undefined });

      await expect(templateApi.delete('template-1')).resolves.toBeUndefined();
    });

    it('존재하지 않는 ID로 삭제 시 에러를 던져야 한다', async () => {
      mock.onDelete('/templates/non-existent').reply(404, { message: '템플릿을 찾을 수 없습니다' });

      await expect(templateApi.delete('non-existent')).rejects.toThrow('템플릿을 찾을 수 없습니다');
    });
  });
});
