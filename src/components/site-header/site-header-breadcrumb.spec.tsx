import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useTemplateStore } from '@/stores/template-store';

import { SiteHeaderBreadcrumb } from './site-header-breadcrumb';

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

describe('SiteHeaderBreadcrumb', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
    });
  });

  it('Propt 링크가 표시되어야 한다', () => {
    render(<SiteHeaderBreadcrumb />, { wrapper: createWrapper() });

    expect(screen.getByText('Propt')).toBeInTheDocument();
  });

  it('activeItem이 없으면 Templates가 표시되어야 한다', () => {
    render(<SiteHeaderBreadcrumb />, { wrapper: createWrapper() });

    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  it('activeItem이 있으면 템플릿 제목이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'My Template',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<SiteHeaderBreadcrumb />, { wrapper: createWrapper() });

    expect(screen.getByText('My Template')).toBeInTheDocument();
  });

  it('사이드바 트리거 버튼이 표시되어야 한다', () => {
    render(<SiteHeaderBreadcrumb />, { wrapper: createWrapper() });

    expect(screen.getByRole('button', { name: /toggle sidebar/i })).toBeInTheDocument();
  });

  it('브레드크럼이 올바르게 렌더링되어야 한다', () => {
    render(<SiteHeaderBreadcrumb />, { wrapper: createWrapper() });

    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });
});
