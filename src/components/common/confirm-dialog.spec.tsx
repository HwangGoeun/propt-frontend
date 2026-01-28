import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ConfirmDialog } from './confirm-dialog';

describe('ConfirmDialog', () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    title: 'Confirm Action',
    description: 'Are you sure?',
    onConfirm: vi.fn(),
  };

  it('열린 상태에서 제목이 표시되어야 한다', () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
  });

  it('설명이 표시되어야 한다', () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('기본 버튼 텍스트가 표시되어야 한다', () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText('확인')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('커스텀 버튼 텍스트가 표시되어야 한다', () => {
    render(
      <ConfirmDialog
        {...defaultProps}
        confirmText="Delete"
        cancelText="Cancel"
      />,
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('확인 버튼 클릭 시 onConfirm과 onOpenChange가 호출되어야 한다', async () => {
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ConfirmDialog
        {...defaultProps}
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
      />,
    );

    await user.click(screen.getByText('확인'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('취소 버튼 클릭 시 onOpenChange가 호출되어야 한다', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(<ConfirmDialog {...defaultProps} onOpenChange={onOpenChange} />);

    await user.click(screen.getByText('취소'));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('닫힌 상태에서 아무것도 렌더링되지 않아야 한다', () => {
    render(<ConfirmDialog {...defaultProps} open={false} />);

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
  });

  it('destructive variant가 적용되어야 한다', () => {
    render(<ConfirmDialog {...defaultProps} variant="destructive" />);

    const confirmButton = screen.getByText('확인');
    expect(confirmButton).toHaveAttribute('data-variant', 'destructive');
  });
});
