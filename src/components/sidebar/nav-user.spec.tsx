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
  };

  it('사용자 정보가 표시되어야 한다', () => {
    render(<NavUser user={mockUser} onLogout={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('이니셜이 표시되어야 한다', () => {
    render(<NavUser user={mockUser} onLogout={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    // "Test User" -> "TU"
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('로그아웃 버튼을 클릭하면 onLogout이 호출되어야 한다', async () => {
    const onLogout = vi.fn();
    const user = userEvent.setup();

    render(<NavUser user={mockUser} onLogout={onLogout} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole('button'));

    await user.click(screen.getByText('Log out'));

    expect(onLogout).toHaveBeenCalled();
  });
});
