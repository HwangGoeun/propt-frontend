import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { authApi } from './auth';
import { apiClient } from './client';

describe('authApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('checkAuthStatus', () => {
    it('인증된 사용자 정보를 반환해야 한다', async () => {
      const mockResponse = {
        ok: true,
        data: {
          isAuthenticated: true,
          user: { id: 'user-1', email: 'test@example.com', name: 'Test User' },
        },
      };
      mock.onGet('/auth/me').reply(200, mockResponse);

      const result = await authApi.checkAuthStatus();

      expect(result).toEqual(mockResponse);
    });

    it('인증되지 않은 상태를 반환해야 한다', async () => {
      const mockResponse = {
        ok: true,
        data: {
          isAuthenticated: false,
          user: null,
        },
      };
      mock.onGet('/auth/me').reply(200, mockResponse);

      const result = await authApi.checkAuthStatus();

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.isAuthenticated).toBe(false);
        expect(result.data.user).toBeNull();
      }
    });

    it('에러 발생 시 예외를 던져야 한다', async () => {
      mock.onGet('/auth/me').reply(500, { message: '서버 오류' });

      await expect(authApi.checkAuthStatus()).rejects.toThrow('서버 오류');
    });
  });

  describe('logout', () => {
    it('로그아웃 요청을 보내야 한다', async () => {
      const mockResponse = { ok: true, data: undefined };
      mock.onPost('/auth/logout').reply(200, mockResponse);

      const result = await authApi.logout();

      expect(result).toEqual(mockResponse);
    });

    it('에러 발생 시 예외를 던져야 한다', async () => {
      mock.onPost('/auth/logout').reply(500, { message: '로그아웃 실패' });

      await expect(authApi.logout()).rejects.toThrow('로그아웃 실패');
    });
  });

  describe('guestLogin', () => {
    it('state 없이 게스트 로그인할 수 있어야 한다', async () => {
      const mockResponse = { ok: true, data: { code: null } };
      mock.onPost('/auth/guest', { state: null }).reply(200, mockResponse);

      const result = await authApi.guestLogin(null);

      expect(result).toEqual(mockResponse);
    });

    it('state=mcp로 게스트 로그인할 수 있어야 한다', async () => {
      const mockResponse = { ok: true, data: { code: 'ABC123' } };
      mock.onPost('/auth/guest', { state: 'mcp' }).reply(200, mockResponse);

      const result = await authApi.guestLogin('mcp');

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.code).toBe('ABC123');
      }
    });

    it('에러 발생 시 예외를 던져야 한다', async () => {
      mock.onPost('/auth/guest').reply(500, { message: '게스트 로그인 실패' });

      await expect(authApi.guestLogin(null)).rejects.toThrow('게스트 로그인 실패');
    });
  });
});
