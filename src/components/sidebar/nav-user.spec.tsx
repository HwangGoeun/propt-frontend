import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { NavUser } from './nav-user';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>{children}</SidebarProvider>
    </QueryClientProvider>
  );
  Wrapper.displayName = 'Wrapper';
  return Wrapper;
};

describe('NavUser', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    hasCompletedOnboarding: false,
  };

  it('사용자 정보가 표시되어야 한다', () => {
    render(<NavUser user={mockUser} onLogout={vi.fn()} onWithdraw={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('이니셜이 표시되어야 한다', () => {
    render(<NavUser user={mockUser} onLogout={vi.fn()} onWithdraw={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    // "Test User" -> "TU"
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('로그아웃 버튼을 클릭하면 onLogout이 호출되어야 한다', async () => {
    const onLogout = vi.fn();
    const user = userEvent.setup();

    render(<NavUser user={mockUser} onLogout={onLogout} onWithdraw={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole('button'));

    await user.click(screen.getByText('로그아웃'));

    expect(onLogout).toHaveBeenCalled();
  });

  it('회원 탈퇴 버튼을 클릭하면 확인 다이얼로그가 표시되어야 한다', async () => {
    const user = userEvent.setup();

    render(<NavUser user={mockUser} onLogout={vi.fn()} onWithdraw={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('회원 탈퇴'));

    expect(screen.getByText('정말 탈퇴하시겠습니까?')).toBeInTheDocument();
    expect(
      screen.getByText('모든 데이터가 삭제되며 이 작업은 되돌릴 수 없습니다.'),
    ).toBeInTheDocument();
  });

  it('확인 다이얼로그에서 탈퇴하기를 클릭하면 onWithdraw가 호출되어야 한다', async () => {
    const onWithdraw = vi.fn();
    const user = userEvent.setup();

    render(<NavUser user={mockUser} onLogout={vi.fn()} onWithdraw={onWithdraw} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('회원 탈퇴'));
    await user.click(screen.getByText('탈퇴하기'));

    expect(onWithdraw).toHaveBeenCalled();
  });

  it('확인 다이얼로그에서 취소를 클릭하면 onWithdraw가 호출되지 않아야 한다', async () => {
    const onWithdraw = vi.fn();
    const user = userEvent.setup();

    render(<NavUser user={mockUser} onLogout={vi.fn()} onWithdraw={onWithdraw} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('회원 탈퇴'));
    await user.click(screen.getByText('취소'));

    expect(onWithdraw).not.toHaveBeenCalled();
  });
});
