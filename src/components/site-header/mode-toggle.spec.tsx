import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ModeToggle } from './mode-toggle';

describe('ModeToggle', () => {
  it('버튼이 렌더링되어야 한다', () => {
    render(<ModeToggle />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('스크린 리더용 텍스트가 있어야 한다', () => {
    render(<ModeToggle />);

    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });

  it('클릭 시 dark 클래스를 토글해야 한다', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await user.click(screen.getByRole('button'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(screen.getByRole('button'));

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('ghost variant가 적용되어야 한다', () => {
    render(<ModeToggle />);

    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'ghost');
  });

  it('icon size가 적용되어야 한다', () => {
    render(<ModeToggle />);

    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon');
  });

  it('Sun과 Moon 아이콘이 있어야 한다', () => {
    render(<ModeToggle />);

    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBe(2);
  });
});
