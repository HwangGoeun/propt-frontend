import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from './auth-store';

vi.mock('@/lib/api/auth', () => ({
  authApi: {
    checkAuthStatus: vi.fn(),
    logout: vi.fn(),
  },
}));

import { authApi } from '@/lib/api/auth';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      authStatus: 'idle',
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('초기 상태', () => {
    it('user가 null이어야 한다', () => {
      const { user } = useAuthStore.getState();

      expect(user).toBeNull();
    });

    it('authStatus가 idle이어야 한다', () => {
      const { authStatus } = useAuthStore.getState();

      expect(authStatus).toBe('idle');
    });
  });

  describe('checkAuthStatus', () => {
    it('인증된 사용자 정보를 설정해야 한다', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com', name: 'Test User' };
      vi.mocked(authApi.checkAuthStatus).mockResolvedValue({
        ok: true,
        data: { isAuthenticated: true, user: mockUser },
      });

      await useAuthStore.getState().checkAuthStatus();

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.authStatus).toBe('authenticated');
    });

    it('인증되지 않은 경우 unauthenticated로 설정해야 한다', async () => {
      vi.mocked(authApi.checkAuthStatus).mockResolvedValue({
        ok: true,
        data: { isAuthenticated: false, user: null },
      });

      await useAuthStore.getState().checkAuthStatus();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.authStatus).toBe('unauthenticated');
    });

    it('API 응답이 ok가 아니면 unauthenticated로 설정해야 한다', async () => {
      vi.mocked(authApi.checkAuthStatus).mockResolvedValue({
        ok: false,
        error: { message: 'Error', code: 'UNKNOWN_ERROR' },
      });

      await useAuthStore.getState().checkAuthStatus();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.authStatus).toBe('unauthenticated');
    });

    it('호출 중 loading 상태로 설정해야 한다', async () => {
      let resolvePromise: (value: unknown) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      vi.mocked(authApi.checkAuthStatus).mockReturnValue(promise as unknown as ReturnType<typeof authApi.checkAuthStatus>);

      const checkPromise = useAuthStore.getState().checkAuthStatus();

      expect(useAuthStore.getState().authStatus).toBe('loading');

      resolvePromise!({
        ok: true,
        data: { isAuthenticated: true, user: { id: '1', email: 'test@test.com', name: 'Test' } },
      });

      await checkPromise;
    });

    it('에러 발생 시 unauthenticated로 설정해야 한다', async () => {
      vi.mocked(authApi.checkAuthStatus).mockRejectedValue(new Error('Network error'));

      await useAuthStore.getState().checkAuthStatus();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.authStatus).toBe('unauthenticated');
    });
  });

  describe('logout', () => {
    it('로그아웃 후 상태를 초기화해야 한다', async () => {
      useAuthStore.setState({
        user: { id: 'user-1', email: 'test@example.com', name: 'Test' },
        authStatus: 'authenticated',
      });

      vi.mocked(authApi.logout).mockResolvedValue({ ok: true, data: undefined });

      await useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.authStatus).toBe('unauthenticated');
    });

    it('로그아웃 API가 호출되어야 한다', async () => {
      vi.mocked(authApi.logout).mockResolvedValue({ ok: true, data: undefined });

      await useAuthStore.getState().logout();

      expect(authApi.logout).toHaveBeenCalledTimes(1);
    });

    it('에러 발생 시에도 상태를 초기화해야 한다', async () => {
      useAuthStore.setState({
        user: { id: 'user-1', email: 'test@example.com', name: 'Test' },
        authStatus: 'authenticated',
      });

      vi.mocked(authApi.logout).mockRejectedValue(new Error('Logout failed'));

      await useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.authStatus).toBe('unauthenticated');
    });
  });
});
