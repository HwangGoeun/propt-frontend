import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { TemplateWorkspace } from './template-workspace';

vi.mock('@/components/template', () => ({
  TemplatePanel: () => <div data-testid="template-panel">Template Panel</div>,
}));

vi.mock('@/components/preview', () => ({
  PreviewPanel: () => <div data-testid="preview-panel">Preview Panel</div>,
}));

vi.mock('@/hooks/use-auto-save', () => ({
  useAutoSave: vi.fn(),
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

describe('TemplateWorkspace', () => {
  it('TemplatePanel이 렌더링되어야 한다', () => {
    render(<TemplateWorkspace />, { wrapper: createWrapper() });

    expect(screen.getByTestId('template-panel')).toBeInTheDocument();
  });

  it('PreviewPanel이 렌더링되어야 한다', () => {
    render(<TemplateWorkspace />, { wrapper: createWrapper() });

    expect(screen.getByTestId('preview-panel')).toBeInTheDocument();
  });
});
