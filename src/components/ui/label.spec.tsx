import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './label';

describe('Label', () => {
  it('Label이 렌더링되어야 한다', () => {
    render(<Label>Label Text</Label>);

    expect(screen.getByText('Label Text')).toBeInTheDocument();
  });

  it('data-slot 속성이 있어야 한다', () => {
    render(<Label>Label</Label>);

    expect(screen.getByText('Label')).toHaveAttribute('data-slot', 'label');
  });

  it('추가 className이 적용되어야 한다', () => {
    render(<Label className="custom-class">Label</Label>);

    expect(screen.getByText('Label')).toHaveClass('custom-class');
  });

  it('htmlFor 속성이 적용되어야 한다', () => {
    render(<Label htmlFor="input-id">Label</Label>);

    expect(screen.getByText('Label')).toHaveAttribute('for', 'input-id');
  });

  it('자식 요소를 렌더링해야 한다', () => {
    render(
      <Label>
        <span>Icon</span>
        Label Text
      </Label>,
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Label Text')).toBeInTheDocument();
  });
});
