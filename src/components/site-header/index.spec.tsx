import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { SiteHeader } from './index';

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
