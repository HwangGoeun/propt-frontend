import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from './App';
import { useAuthStore } from './stores/auth-store';

vi.mock('@/lib/api/auth', () => ({
  authApi: {
    checkAuthStatus: vi.fn().mockResolvedValue({
      ok: true,
      data: { isAuthenticated: false, user: null },
    }),
    logout: vi.fn(),
    guestLogin: vi.fn(),
  },
}));

describe('App', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      authStatus: 'idle',
    });
  });

  it('앱이 렌더링되어야 한다', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Propt/)).toBeInTheDocument();
    });
  });

  it('루트 경로에서 /login으로 리다이렉트해야 한다', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('다시 오신 것을 환영합니다')).toBeInTheDocument();
    });
  });

  it('checkAuthStatus가 호출되어야 한다', async () => {
    const checkAuthStatus = vi.fn();
    useAuthStore.setState({
      checkAuthStatus,
      user: null,
      authStatus: 'idle',
    });

    render(<App />);

    await waitFor(() => {
      expect(checkAuthStatus).toHaveBeenCalled();
    });
  });
});
