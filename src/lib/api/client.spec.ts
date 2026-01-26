
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { apiClient } from './client';

describe('apiClient', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('기본 설정', () => {
    it('baseURL이 설정되어 있어야 한다', () => {
      expect(apiClient.defaults.baseURL).toBeDefined();
    });

    it('timeout이 10000ms로 설정되어 있어야 한다', () => {
      expect(apiClient.defaults.timeout).toBe(10000);
    });

    it('withCredentials가 true로 설정되어 있어야 한다', () => {
      expect(apiClient.defaults.withCredentials).toBe(true);
    });

    it('Content-Type이 application/json으로 설정되어 있어야 한다', () => {
      expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('응답 인터셉터', () => {
    it('정상 응답을 그대로 반환해야 한다', async () => {
      const responseData = { ok: true, data: { id: '1', name: 'Test' } };
      mock.onGet('/test').reply(200, responseData);

      const response = await apiClient.get('/test');

      expect(response.data).toEqual(responseData);
    });

    it('이중 래핑된 응답을 언래핑해야 한다', async () => {
      const innerData = { ok: true, data: { id: '1', name: 'Test' } };
      const wrappedData = { data: innerData };
      mock.onGet('/test').reply(200, wrappedData);

      const response = await apiClient.get('/test');

      expect(response.data).toEqual(innerData);
    });

    it('이중 래핑되지 않은 응답은 그대로 유지해야 한다', async () => {
      const responseData = { ok: true, data: { id: '1' } };
      mock.onGet('/test').reply(200, responseData);

      const response = await apiClient.get('/test');

      expect(response.data).toEqual(responseData);
    });

    it('서버 에러 시 에러 메시지를 추출해야 한다', async () => {
      mock.onGet('/test').reply(500, { message: '서버 내부 오류' });

      await expect(apiClient.get('/test')).rejects.toThrow('서버 내부 오류');
    });

    it('에러 메시지가 없으면 기본 메시지를 사용해야 한다', async () => {
      mock.onGet('/test').reply(500, {});

      await expect(apiClient.get('/test')).rejects.toThrow('서버 오류가 발생했습니다.');
    });

    it('네트워크 에러 시 기본 메시지를 사용해야 한다', async () => {
      mock.onGet('/test').networkError();

      await expect(apiClient.get('/test')).rejects.toThrow('서버 오류가 발생했습니다.');
    });

    it('401 에러를 처리해야 한다', async () => {
      mock.onGet('/test').reply(401, { message: '인증이 필요합니다' });

      await expect(apiClient.get('/test')).rejects.toThrow('인증이 필요합니다');
    });

    it('404 에러를 처리해야 한다', async () => {
      mock.onGet('/test').reply(404, { message: '리소스를 찾을 수 없습니다' });

      await expect(apiClient.get('/test')).rejects.toThrow('리소스를 찾을 수 없습니다');
    });
  });

  describe('HTTP 메서드', () => {
    it('GET 요청을 보낼 수 있어야 한다', async () => {
      mock.onGet('/test').reply(200, { data: 'get' });

      const response = await apiClient.get('/test');

      expect(response.data).toEqual({ data: 'get' });
    });

    it('POST 요청을 보낼 수 있어야 한다', async () => {
      mock.onPost('/test', { name: 'test' }).reply(201, { data: 'created' });

      const response = await apiClient.post('/test', { name: 'test' });

      expect(response.data).toEqual({ data: 'created' });
    });

    it('PATCH 요청을 보낼 수 있어야 한다', async () => {
      mock.onPatch('/test/1', { name: 'updated' }).reply(200, { data: 'patched' });

      const response = await apiClient.patch('/test/1', { name: 'updated' });

      expect(response.data).toEqual({ data: 'patched' });
    });

    it('DELETE 요청을 보낼 수 있어야 한다', async () => {
      mock.onDelete('/test/1').reply(200, { data: 'deleted' });

      const response = await apiClient.delete('/test/1');

      expect(response.data).toEqual({ data: 'deleted' });
    });
  });
});
