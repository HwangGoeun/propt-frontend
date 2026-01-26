import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BlockWrapper } from './block-wrapper';

describe('BlockWrapper', () => {
  it('title이 렌더링되어야 한다', () => {
    render(<BlockWrapper title="Test Title">Content</BlockWrapper>);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('children이 렌더링되어야 한다', () => {
    render(<BlockWrapper title="Title">Child Content</BlockWrapper>);

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('onClose가 없으면 닫기 버튼이 없어야 한다', () => {
    render(<BlockWrapper title="Title">Content</BlockWrapper>);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('onClose가 있으면 닫기 버튼이 있어야 한다', () => {
    const handleClose = vi.fn();
    render(
      <BlockWrapper title="Title" onClose={handleClose}>
        Content
      </BlockWrapper>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose가 호출되어야 한다', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <BlockWrapper title="Title" onClose={handleClose}>
        Content
      </BlockWrapper>,
    );

    await user.click(screen.getByRole('button'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('section 요소로 렌더링되어야 한다', () => {
    render(<BlockWrapper title="Title">Content</BlockWrapper>);

    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
