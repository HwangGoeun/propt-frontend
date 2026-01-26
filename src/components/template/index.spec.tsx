import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useTemplateStore } from '@/stores/template-store';

import { TemplatePanel } from './index';

vi.mock('@/components/template/template-header', () => ({
  TemplateHeader: () => <div data-testid="template-header">Template Header</div>,
}));

vi.mock('@/components/template/text-block', () => ({
  TextBlock: () => <div data-testid="text-block">Text Block</div>,
}));

vi.mock('@/components/template/output-type-block', () => ({
  OutputTypeBlock: () => <div data-testid="output-type-block">Output Type Block</div>,
}));

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

describe('TemplatePanel', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
      showOutputTypeBlock: false,
    });
  });

  it('TemplateHeader가 렌더링되어야 한다', () => {
    render(<TemplatePanel />, { wrapper: createWrapper() });

    expect(screen.getByTestId('template-header')).toBeInTheDocument();
  });

  it('TextBlock이 렌더링되어야 한다', () => {
    render(<TemplatePanel />, { wrapper: createWrapper() });

    expect(screen.getByTestId('text-block')).toBeInTheDocument();
  });

  it('showOutputTypeBlock이 false이면 OutputTypeBlock이 렌더링되지 않아야 한다', () => {
    useTemplateStore.setState({
      activeItem: null,
      showOutputTypeBlock: false,
    });

    render(<TemplatePanel />, { wrapper: createWrapper() });

    expect(screen.queryByTestId('output-type-block')).not.toBeInTheDocument();
  });

  it('showOutputTypeBlock이 true이면 OutputTypeBlock이 렌더링되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: null,
      showOutputTypeBlock: true,
    });

    render(<TemplatePanel />, { wrapper: createWrapper() });

    expect(screen.getByTestId('output-type-block')).toBeInTheDocument();
  });

  it('activeItem에 outputType이 있으면 OutputTypeBlock이 렌더링되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: 'text',
      },
      showOutputTypeBlock: false,
    });

    render(<TemplatePanel />, { wrapper: createWrapper() });

    expect(screen.getByTestId('output-type-block')).toBeInTheDocument();
  });
});
