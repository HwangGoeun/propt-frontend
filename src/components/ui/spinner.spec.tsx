import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Spinner } from './spinner';

describe('Spinner', () => {
  it('Spinner가 렌더링되어야 한다', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('aria-label이 Loading이어야 한다', () => {
    render(<Spinner />);

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('animate-spin 클래스가 있어야 한다', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toHaveClass('animate-spin');
  });

  it('추가 className이 적용되어야 한다', () => {
    render(<Spinner className="custom-class" />);

    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });
});
