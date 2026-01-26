import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useTemplateStore } from '@/stores/template-store';
import type { Template } from '@/types/template';

import { OptionNavGroup, TemplateNavGroup } from './nav-group';

vi.mock('@/hooks/use-templates', () => ({
  useDeleteTemplate: vi.fn(() => ({
    mutate: vi.fn(),
  })),
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

describe('TemplateNavGroup', () => {
  const mockTemplates: Template[] = [
    { id: '1', title: 'Template 1', content: '', variables: [], outputType: null },
    { id: '2', title: 'Template 2', content: '', variables: [], outputType: null },
  ];

  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
      isInitialized: false,
      saveStatus: 'idle',
      showOutputTypeBlock: false,
    });
  });

  it('제목이 표시되어야 한다', () => {
    render(<TemplateNavGroup title="MY TEMPLATES" items={[]} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('MY TEMPLATES')).toBeInTheDocument();
  });

  it('템플릿 목록이 렌더링되어야 한다', () => {
    render(<TemplateNavGroup title="MY TEMPLATES" items={mockTemplates} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('Template 1')).toBeInTheDocument();
    expect(screen.getByText('Template 2')).toBeInTheDocument();
  });

  it('템플릿 클릭 시 setActiveItem이 호출되어야 한다', async () => {
    const user = userEvent.setup();

    render(<TemplateNavGroup title="MY TEMPLATES" items={mockTemplates} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByText('Template 1'));

    const state = useTemplateStore.getState();
    expect(state.activeItem?.id).toBe('1');
  });

  it('빈 템플릿 목록도 렌더링되어야 한다', () => {
    render(<TemplateNavGroup title="MY TEMPLATES" items={[]} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('MY TEMPLATES')).toBeInTheDocument();
  });
});

describe('OptionNavGroup', () => {
  const mockOptions = [
    {
      id: 'output-type' as const,
      label: 'Option 1',
      icon: <span>Icon1</span>,
      onClick: vi.fn(),
      isActive: false,
    },
    {
      id: 'output-type' as const,
      label: 'Option 2',
      icon: <span>Icon2</span>,
      onClick: vi.fn(),
      isActive: true,
    },
  ];

  it('제목이 표시되어야 한다', () => {
    render(<OptionNavGroup title="OPTIONS" options={[]} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('OPTIONS')).toBeInTheDocument();
  });

  it('옵션 목록이 렌더링되어야 한다', () => {
    render(<OptionNavGroup title="OPTIONS" options={mockOptions} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('옵션 클릭 시 onClick이 호출되어야 한다', async () => {
    const onClick = vi.fn();
    const options = [
      { id: 'output-type' as const, label: 'Clickable', icon: <span>Icon</span>, onClick, isActive: false },
    ];
    const user = userEvent.setup();

    render(<OptionNavGroup title="OPTIONS" options={options} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByText('Clickable'));

    expect(onClick).toHaveBeenCalled();
  });

  it('아이콘이 렌더링되어야 한다', () => {
    render(<OptionNavGroup title="OPTIONS" options={mockOptions} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('Icon1')).toBeInTheDocument();
    expect(screen.getByText('Icon2')).toBeInTheDocument();
  });
});
