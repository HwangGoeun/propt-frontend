import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '@/stores/auth-store';
import { useOnboardingStore } from '@/stores/onboarding-store';

vi.mock('@/hooks/use-templates', () => ({
  useTemplates: vi.fn(() => ({
    isLoading: false,
  })),
}));

vi.mock('@/lib/api/auth', () => ({
  authApi: {
    updateOnboarding: vi.fn().mockResolvedValue({ ok: true }),
  },
}));

import { useTemplates } from '@/hooks/use-templates';

import { useOnboarding } from './use-onboarding';

describe('useOnboarding', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTemplates).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: null,
      isError: false,
      isPending: false,
      isSuccess: true,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useTemplates>);

    useAuthStore.setState({
      user: {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        hasCompletedOnboarding: false,
      },
      authStatus: 'authenticated',
    });

    useOnboardingStore.setState({
      isTourRunning: false,
      currentStep: 0,
      stepCompleted: false,
      isMcpGuideModalOpen: false,
    });
  });

  // ==================== 온보딩 자동 시작 조건 ====================

  describe('온보딩 자동 시작', () => {
    it('온보딩 미완료 상태에서 가이드가 시작되어야 한다', async () => {
      useAuthStore.setState({
        user: {
          id: 'user-1',
          email: 'test@example.com',
          name: 'Test User',
          hasCompletedOnboarding: false,
        },
      });
      useOnboardingStore.setState({
        isTourRunning: false,
      });

      renderHook(() => useOnboarding());

      await waitFor(() => {
        expect(useOnboardingStore.getState().isTourRunning).toBe(true);
      });
    });

    it('온보딩 완료 상태 (hasCompletedOnboarding: true)에서 가이드가 시작되지 않아야 한다', async () => {
      useAuthStore.setState({
        user: {
          id: 'user-1',
          email: 'test@example.com',
          name: 'Test User',
          hasCompletedOnboarding: true,
        },
      });
      useOnboardingStore.setState({
        isTourRunning: false,
      });

      renderHook(() => useOnboarding());

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(useOnboardingStore.getState().isTourRunning).toBe(false);
    });

    it('이미 투어가 실행 중이면 다시 시작하지 않아야 한다', async () => {
      const startTourSpy = vi.spyOn(useOnboardingStore.getState(), 'startTour');
      useAuthStore.setState({
        user: {
          id: 'user-1',
          email: 'test@example.com',
          name: 'Test User',
          hasCompletedOnboarding: false,
        },
      });
      useOnboardingStore.setState({
        isTourRunning: true,
      });

      renderHook(() => useOnboarding());

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(startTourSpy).not.toHaveBeenCalled();
    });

    it('템플릿 로딩 중에는 가이드가 시작되지 않아야 한다', async () => {
      vi.mocked(useTemplates).mockReturnValue({
        isLoading: true,
        data: undefined,
        error: null,
        isError: false,
        isPending: true,
        isSuccess: false,
        refetch: vi.fn(),
      } as unknown as ReturnType<typeof useTemplates>);

      useAuthStore.setState({
        user: {
          id: 'user-1',
          email: 'test@example.com',
          name: 'Test User',
          hasCompletedOnboarding: false,
        },
      });
      useOnboardingStore.setState({
        isTourRunning: false,
      });

      renderHook(() => useOnboarding());

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(useOnboardingStore.getState().isTourRunning).toBe(false);
    });
  });

  // ==================== 재로그인 시나리오 ====================

  describe('재로그인 시 온보딩 상태 유지', () => {
    it('온보딩을 완료한 사용자가 재로그인하면 가이드가 나오지 않아야 한다', async () => {
      useAuthStore.setState({
        user: {
          id: 'user-1',
          email: 'test@example.com',
          name: 'Test User',
          hasCompletedOnboarding: true,
        },
      });
      useOnboardingStore.setState({
        isTourRunning: false,
      });

      // 재로그인 후 페이지 진입
      renderHook(() => useOnboarding());

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(useOnboardingStore.getState().isTourRunning).toBe(false);
    });

    it('온보딩을 건너뛴 사용자가 재로그인하면 가이드가 나오지 않아야 한다', async () => {
      useAuthStore.setState({
        user: {
          id: 'user-1',
          email: 'test@example.com',
          name: 'Test User',
          hasCompletedOnboarding: true,
        },
      });
      useOnboardingStore.setState({
        isTourRunning: false,
      });

      // 재로그인 후 페이지 진입
      renderHook(() => useOnboarding());

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(useOnboardingStore.getState().isTourRunning).toBe(false);
    });

    it('온보딩을 완료하지 않은 신규 사용자가 로그인하면 가이드가 나와야 한다', async () => {
      useAuthStore.setState({
        user: {
          id: 'user-1',
          email: 'test@example.com',
          name: 'Test User',
          hasCompletedOnboarding: false,
        },
      });
      useOnboardingStore.setState({
        isTourRunning: false,
      });

      renderHook(() => useOnboarding());

      await waitFor(() => {
        expect(useOnboardingStore.getState().isTourRunning).toBe(true);
      });
    });
  });

  // ==================== 훅 반환값 검증 ====================

  describe('훅 반환값', () => {
    it('필요한 상태와 함수들을 반환해야 한다', () => {
      const { result } = renderHook(() => useOnboarding());

      expect(result.current).toHaveProperty('isTourRunning');
      expect(result.current).toHaveProperty('currentStep');
      expect(result.current).toHaveProperty('stepCompleted');
      expect(result.current).toHaveProperty('stopTour');
      expect(result.current).toHaveProperty('completeTour');
      expect(result.current).toHaveProperty('restartTour');
    });

    it('restartTour 호출 시 투어가 재시작되어야 한다', async () => {
      useAuthStore.setState({
        user: {
          id: 'user-1',
          email: 'test@example.com',
          name: 'Test User',
          hasCompletedOnboarding: true,
        },
      });
      useOnboardingStore.setState({
        isTourRunning: false,
      });

      const { result } = renderHook(() => useOnboarding());

      await result.current.restartTour();

      expect(useOnboardingStore.getState().isTourRunning).toBe(true);
    });
  });
});
