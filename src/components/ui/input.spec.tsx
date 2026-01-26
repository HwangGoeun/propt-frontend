import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('기본 input이 렌더링되어야 한다', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('data-slot 속성이 있어야 한다', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
  });

  it('type이 적용되어야 한다', () => {
    render(<Input type="email" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('placeholder가 표시되어야 한다', () => {
    render(<Input placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('값 입력이 가능해야 한다', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello');

    expect(input).toHaveValue('Hello');
  });

  it('onChange 핸들러가 호출되어야 한다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={handleChange} />);

    await user.type(screen.getByRole('textbox'), 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('disabled 상태가 적용되어야 한다', () => {
    render(<Input disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('추가 className이 적용되어야 한다', () => {
    render(<Input className="custom-class" />);

    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('password type이 적용되어야 한다', () => {
    render(<Input type="password" />);

    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
  });
});
