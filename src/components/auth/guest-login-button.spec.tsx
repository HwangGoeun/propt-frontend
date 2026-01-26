import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GuestLoginButton } from './guest-login-button';

vi.mock('@/lib/api/auth', () => ({
  authApi: {
    guestLogin: vi.fn(),
  },
}));

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    checkAuthStatus: vi.fn(),
  })),
}));

import { authApi } from '@/lib/api/auth';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('GuestLoginButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('버튼이 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <GuestLoginButton state={null} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /게스트로 시작하기/i })).toBeInTheDocument();
  });

  it('UserIcon이 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <GuestLoginButton state={null} />
      </MemoryRouter>,
    );

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('클릭 시 로딩 상태가 되어야 한다', async () => {
    vi.mocked(authApi.guestLogin).mockImplementation(
      () => new Promise(() => { }),
    );

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <GuestLoginButton state={null} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('로그인 중...')).toBeInTheDocument();
  });

  it('일반 로그인 성공 시 /templates로 이동해야 한다', async () => {
    vi.mocked(authApi.guestLogin).mockResolvedValue({
      ok: true,
      data: { code: null },
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <GuestLoginButton state={null} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/templates');
    });
  });

  it('MCP 로그인 성공 시 /mcp/code로 이동해야 한다', async () => {
    vi.mocked(authApi.guestLogin).mockResolvedValue({
      ok: true,
      data: { code: 'ABC123' },
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <GuestLoginButton state="mcp" />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/mcp/code?code=ABC123');
    });
  });

  it('secondary variant가 적용되어야 한다', () => {
    render(
      <MemoryRouter>
        <GuestLoginButton state={null} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'secondary');
  });
});
