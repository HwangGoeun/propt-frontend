import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('Skeleton이 렌더링되어야 한다', () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('data-slot 속성이 있어야 한다', () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-slot', 'skeleton');
  });

  it('animate-pulse 클래스가 있어야 한다', () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse');
  });

  it('추가 className이 적용되어야 한다', () => {
    render(<Skeleton data-testid="skeleton" className="custom-class" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
  });

  it('자식 요소를 렌더링해야 한다', () => {
    render(<Skeleton>Loading...</Skeleton>);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
