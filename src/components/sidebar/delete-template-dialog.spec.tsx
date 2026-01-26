import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DeleteTemplateDialog } from './delete-template-dialog';

vi.mock('@/hooks/use-templates', () => ({
  useDeleteTemplate: vi.fn(() => ({
    mutate: vi.fn(),
  })),
}));

import { useDeleteTemplate } from '@/hooks/use-templates';

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

describe('DeleteTemplateDialog', () => {
  it('열린 상태에서 다이얼로그가 표시되어야 한다', () => {
    render(
      <DeleteTemplateDialog
        templateId="template-1"
        open={true}
        onOpenChange={vi.fn()}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText('템플릿 삭제')).toBeInTheDocument();
  });

  it('삭제 확인 메시지가 표시되어야 한다', () => {
    render(
      <DeleteTemplateDialog
        templateId="template-1"
        open={true}
        onOpenChange={vi.fn()}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText(/정말로 이 템플릿을 삭제하시겠습니까/)).toBeInTheDocument();
  });

  it('취소 버튼이 있어야 한다', () => {
    render(
      <DeleteTemplateDialog
        templateId="template-1"
        open={true}
        onOpenChange={vi.fn()}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('삭제 버튼이 있어야 한다', () => {
    render(
      <DeleteTemplateDialog
        templateId="template-1"
        open={true}
        onOpenChange={vi.fn()}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText('삭제')).toBeInTheDocument();
  });

  it('취소 버튼 클릭 시 onOpenChange가 false로 호출되어야 한다', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <DeleteTemplateDialog
        templateId="template-1"
        open={true}
        onOpenChange={onOpenChange}
      />,
      { wrapper: createWrapper() },
    );

    await user.click(screen.getByText('취소'));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('삭제 버튼 클릭 시 deleteTemplate이 호출되어야 한다', async () => {
    const mockDeleteTemplate = vi.fn();
    vi.mocked(useDeleteTemplate).mockReturnValue({ mutate: mockDeleteTemplate } as unknown as ReturnType<typeof useDeleteTemplate>);

    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <DeleteTemplateDialog
        templateId="template-123"
        open={true}
        onOpenChange={onOpenChange}
      />,
      { wrapper: createWrapper() },
    );

    await user.click(screen.getByText('삭제'));

    expect(mockDeleteTemplate).toHaveBeenCalledWith('template-123');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('닫힌 상태에서 다이얼로그가 표시되지 않아야 한다', () => {
    render(
      <DeleteTemplateDialog
        templateId="template-1"
        open={false}
        onOpenChange={vi.fn()}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.queryByText('템플릿 삭제')).not.toBeInTheDocument();
  });
});
