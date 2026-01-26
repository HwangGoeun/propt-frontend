import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DividerWithText } from './divider-with-text';

describe('DividerWithText', () => {
  it('기본 텍스트 "또는"이 표시되어야 한다', () => {
    render(<DividerWithText />);

    expect(screen.getByText('또는')).toBeInTheDocument();
  });

  it('커스텀 텍스트가 표시되어야 한다', () => {
    render(<DividerWithText text="OR" />);

    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('추가 className이 적용되어야 한다', () => {
    render(<DividerWithText className="custom-class" data-testid="divider" />);

    expect(screen.getByTestId('divider')).toHaveClass('custom-class');
  });

  it('구분선이 렌더링되어야 한다', () => {
    render(<DividerWithText />);

    const borderElement = document.querySelector('.border-t');
    expect(borderElement).toBeInTheDocument();
  });
});
