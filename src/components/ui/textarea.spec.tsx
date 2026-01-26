import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('기본 textarea가 렌더링되어야 한다', () => {
    render(<Textarea />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('data-slot 속성이 있어야 한다', () => {
    render(<Textarea />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'textarea');
  });

  it('placeholder가 표시되어야 한다', () => {
    render(<Textarea placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('값 입력이 가능해야 한다', async () => {
    const user = userEvent.setup();
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello World');

    expect(textarea).toHaveValue('Hello World');
  });

  it('onChange 핸들러가 호출되어야 한다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Textarea onChange={handleChange} />);

    await user.type(screen.getByRole('textbox'), 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('disabled 상태가 적용되어야 한다', () => {
    render(<Textarea disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('추가 className이 적용되어야 한다', () => {
    render(<Textarea className="custom-class" />);

    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('rows 속성이 적용되어야 한다', () => {
    render(<Textarea rows={5} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });
});
