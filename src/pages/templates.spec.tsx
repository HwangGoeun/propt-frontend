import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useTemplateStore } from '@/stores/template-store';
import type { Template } from '@/types/template';

import TemplatesPage from './templates';

vi.mock('@/components/sidebar', () => ({
  AppSidebar: () => <div data-testid="app-sidebar">App Sidebar</div>,
}));

vi.mock('@/components/site-header', () => ({
  SiteHeader: () => <div data-testid="site-header">Site Header</div>,
}));

vi.mock('@/components/template/template-workspace', () => ({
  TemplateWorkspace: () => <div data-testid="template-workspace">Template Workspace</div>,
}));

vi.mock('@/hooks/use-templates', () => ({
  useTemplates: vi.fn(() => ({
    data: [],
    isLoading: false,
    error: null,
  })),
}));

import { useTemplates } from '@/hooks/use-templates';

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

describe('TemplatesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTemplateStore.setState({
      activeItem: null,
      setActiveItem: vi.fn(),
    });
  });

  it('SiteHeader가 렌더링되어야 한다', () => {
    render(<TemplatesPage />, { wrapper: createWrapper() });

    expect(screen.getByTestId('site-header')).toBeInTheDocument();
  });

  it('AppSidebar가 렌더링되어야 한다', () => {
    render(<TemplatesPage />, { wrapper: createWrapper() });

    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
  });

  it('템플릿이 없으면 안내 메시지가 표시되어야 한다', () => {
    render(<TemplatesPage />, { wrapper: createWrapper() });

    expect(screen.getByText('템플릿이 없습니다')).toBeInTheDocument();
    expect(screen.getByText('새로운 템플릿을 생성해보세요!')).toBeInTheDocument();
  });

  it('activeItem이 있으면 TemplateWorkspace가 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test Template',
        content: 'Test content',
        variables: [],
        outputType: null,
      },
      setActiveItem: vi.fn(),
    });

    render(<TemplatesPage />, { wrapper: createWrapper() });

    expect(screen.getByTestId('template-workspace')).toBeInTheDocument();
  });

  it('템플릿이 로드되면 첫 번째 템플릿을 activeItem으로 설정해야 한다', async () => {
    const setActiveItem = vi.fn();
    const templates: Template[] = [
      { id: '1', title: 'Template 1', content: 'Content 1', variables: [], outputType: null },
      { id: '2', title: 'Template 2', content: 'Content 2', variables: [], outputType: null },
    ];

    useTemplateStore.setState({
      activeItem: null,
      setActiveItem,
    });

    vi.mocked(useTemplates).mockReturnValue({
      data: templates,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useTemplates>);

    render(<TemplatesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(setActiveItem).toHaveBeenCalledWith({
        id: '1',
        title: 'Template 1',
        content: 'Content 1',
        variables: [],
      });
    });
  });

  it('이미 activeItem이 있고 템플릿 목록에 존재하면 변경하지 않아야 한다', async () => {
    const setActiveItem = vi.fn();
    const templates: Template[] = [
      { id: '1', title: 'Template 1', content: 'Content 1', variables: [], outputType: null },
    ];

    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Template 1',
        content: 'Content 1',
        variables: [],
        outputType: null,
      },
      setActiveItem,
    });

    vi.mocked(useTemplates).mockReturnValue({
      data: templates,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useTemplates>);

    render(<TemplatesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(setActiveItem).not.toHaveBeenCalled();
    });
  });

  it('isLoading이 true이면 activeItem을 설정하지 않아야 한다', async () => {
    const setActiveItem = vi.fn();

    useTemplateStore.setState({
      activeItem: null,
      setActiveItem,
    });

    vi.mocked(useTemplates).mockReturnValue({
      isLoading: true,
      error: null,
    } as unknown as ReturnType<typeof useTemplates>);

    render(<TemplatesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(setActiveItem).not.toHaveBeenCalled();
    });
  });

  it('템플릿 목록에서 activeItem이 제거되면 첫 번째 템플릿으로 변경해야 한다', async () => {
    const setActiveItem = vi.fn();
    const templates: Template[] = [
      { id: '2', title: 'Template 2', content: 'Content 2', variables: [], outputType: null },
    ];

    useTemplateStore.setState({
      activeItem: {
        id: '1', // This ID is not in templates
        title: 'Deleted Template',
        content: '',
        variables: [],
        outputType: null,
      },
      setActiveItem,
    });

    vi.mocked(useTemplates).mockReturnValue({
      data: templates,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useTemplates>);

    render(<TemplatesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(setActiveItem).toHaveBeenCalledWith({
        id: '2',
        title: 'Template 2',
        content: 'Content 2',
        variables: [],
      });
    });
  });
});
