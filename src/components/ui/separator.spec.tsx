import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Separator } from './separator';

describe('Separator', () => {
  it('Separator가 렌더링되어야 한다', () => {
    render(<Separator data-testid="separator" />);

    expect(screen.getByTestId('separator')).toBeInTheDocument();
  });

  it('data-slot 속성이 있어야 한다', () => {
    render(<Separator data-testid="separator" />);

    expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'separator');
  });

  it('기본 orientation이 horizontal이어야 한다', () => {
    render(<Separator data-testid="separator" />);

    expect(screen.getByTestId('separator')).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('vertical orientation이 적용되어야 한다', () => {
    render(<Separator data-testid="separator" orientation="vertical" />);

    expect(screen.getByTestId('separator')).toHaveAttribute('data-orientation', 'vertical');
  });

  it('추가 className이 적용되어야 한다', () => {
    render(<Separator data-testid="separator" className="custom-class" />);

    expect(screen.getByTestId('separator')).toHaveClass('custom-class');
  });

  it('decorative가 false일 때 separator role이 있어야 한다', () => {
    render(<Separator decorative={false} />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
