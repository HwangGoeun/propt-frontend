import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { SiteHeader } from './index';

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

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

describe('SiteHeader', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: mockLocalStorage,
    });
  });

  it('헤더가 렌더링되어야 한다', () => {
    render(<SiteHeader />, { wrapper: createWrapper() });

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('Propt 브레드크럼이 표시되어야 한다', () => {
    render(<SiteHeader />, { wrapper: createWrapper() });

    expect(screen.getByText('Propt')).toBeInTheDocument();
  });

  it('MCP 설정 가이드 버튼이 표시되어야 한다', () => {
    render(<SiteHeader />, { wrapper: createWrapper() });

    expect(screen.getByText('MCP 설정 가이드')).toBeInTheDocument();
  });

  it('모드 토글 버튼이 표시되어야 한다', () => {
    render(<SiteHeader />, { wrapper: createWrapper() });

    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });
});
