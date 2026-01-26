import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/auth-store';
import { useTemplateStore } from '@/stores/template-store';
import type { Template } from '@/types/template';

import { AppSidebar } from './index';

const mockCreateTemplate = vi.fn();
vi.mock('@/hooks/use-templates', () => ({
  useTemplates: vi.fn(() => ({
    data: [] as Template[],
    isLoading: false,
    error: null,
  })),
  useCreateTemplate: vi.fn(() => ({
    mutate: mockCreateTemplate,
  })),
  useDeleteTemplate: vi.fn(() => ({
    mutate: vi.fn(),
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

describe('AppSidebar', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: mockUser,
      logout: vi.fn(),
    });
    useTemplateStore.setState({
      activeItem: null,
      showOutputTypeBlock: false,
      setShowOutputTypeBlock: vi.fn(),
    });
  });

  it('새 프롬프트 만들기 버튼이 표시되어야 한다', () => {
    render(<AppSidebar />, { wrapper: createWrapper() });

    expect(screen.getByText('새 프롬프트 만들기')).toBeInTheDocument();
  });

  it('MY TEMPLATES 그룹이 표시되어야 한다', () => {
    render(<AppSidebar />, { wrapper: createWrapper() });

    expect(screen.getByText('MY TEMPLATES')).toBeInTheDocument();
  });

  it('OPTIONS 그룹이 표시되어야 한다', () => {
    render(<AppSidebar />, { wrapper: createWrapper() });

    expect(screen.getByText('OPTIONS')).toBeInTheDocument();
  });

  it('새 프롬프트 만들기 버튼 클릭 시 createTemplate이 호출되어야 한다', async () => {
    const user = userEvent.setup();
    render(<AppSidebar />, { wrapper: createWrapper() });

    await user.click(screen.getByText('새 프롬프트 만들기'));

    expect(mockCreateTemplate).toHaveBeenCalledWith({
      title: '새로운 프롬프트',
      content: '프롬프트를 입력해주세요.',
      variables: [],
      outputType: null,
    });
  });

  it('유저가 있으면 NavUser가 표시되어야 한다', () => {
    render(<AppSidebar />, { wrapper: createWrapper() });

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('유저가 없으면 NavUser가 표시되지 않아야 한다', () => {
    useAuthStore.setState({
      user: null,
      logout: vi.fn(),
    });

    render(<AppSidebar />, { wrapper: createWrapper() });

    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
  });

  it('템플릿이 이미 있으면 고유한 제목을 생성해야 한다', async () => {
    const templates: Template[] = [
      { id: '1', title: '새로운 프롬프트', content: '', variables: [], outputType: null },
    ];
    vi.mocked(useTemplates).mockReturnValue({
      data: templates,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useTemplates>);

    const user = userEvent.setup();
    render(<AppSidebar />, { wrapper: createWrapper() });

    await user.click(screen.getByText('새 프롬프트 만들기'));

    expect(mockCreateTemplate).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringMatching(/새로운 프롬프트/),
      }),
    );
  });
});
