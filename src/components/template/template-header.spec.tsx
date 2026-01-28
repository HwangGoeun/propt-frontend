import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTemplateStore } from '@/stores/template-store';

import { TemplateHeader } from './template-header';

vi.mock('@/hooks/use-templates', () => ({
  useUpdateTemplate: vi.fn(() => ({
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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'Wrapper';
  return Wrapper;
};

describe('TemplateHeader', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
      isInitialized: false,
      saveStatus: 'idle',
      showOutputTypeBlock: false,
    });
  });

  it('activeItem이 없으면 null을 반환해야 한다', () => {
    const { container } = render(<TemplateHeader />, { wrapper: createWrapper() });

    expect(container.firstChild).toBeNull();
  });

  it('제목이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test Template',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<TemplateHeader />, { wrapper: createWrapper() });

    expect(screen.getByText('Test Template')).toBeInTheDocument();
  });

  it('안내 텍스트가 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'My Template',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<TemplateHeader />, { wrapper: createWrapper() });

    expect(screen.getByText(/프로프트 My Template/)).toBeInTheDocument();
  });

  it('editing 상태일 때 "작성 중" 표시', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
      saveStatus: 'editing',
    });

    render(<TemplateHeader />, { wrapper: createWrapper() });

    expect(screen.getByText('작성 중...')).toBeInTheDocument();
  });

  it('saving 상태일 때 "저장 중" 표시', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
      saveStatus: 'saving',
    });

    render(<TemplateHeader />, { wrapper: createWrapper() });

    expect(screen.getByText('저장 중...')).toBeInTheDocument();
  });

  it('saved 상태일 때 "저장됨" 표시', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
      saveStatus: 'saved',
    });

    render(<TemplateHeader />, { wrapper: createWrapper() });

    expect(screen.getByText('저장됨')).toBeInTheDocument();
  });

  it('error 상태일 때 재시도 버튼 표시', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
      saveStatus: 'error',
    });

    render(<TemplateHeader />, { wrapper: createWrapper() });

    expect(screen.getByText('저장 실패')).toBeInTheDocument();
    expect(screen.getByText('재시도')).toBeInTheDocument();
  });

  it('제목 클릭 시 편집 모드가 되어야 한다', async () => {
    const user = userEvent.setup();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<TemplateHeader />, { wrapper: createWrapper() });

    await user.click(screen.getByText('Test'));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('편집 모드에서 Enter 키로 편집을 종료해야 한다', async () => {
    const user = userEvent.setup();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<TemplateHeader />, { wrapper: createWrapper() });

    await user.click(screen.getByText('Test'));
    const input = screen.getByRole('textbox');

    await user.type(input, '{Enter}');

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
