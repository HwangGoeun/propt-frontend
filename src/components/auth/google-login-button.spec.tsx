import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { GoogleLoginButton } from './google-login-button';

describe('GoogleLoginButton', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('버튼이 렌더링되어야 한다', () => {
    render(<GoogleLoginButton state={null} />);

    expect(screen.getByRole('button', { name: /Google로 시작하기/i })).toBeInTheDocument();
  });

  it('Google 아이콘이 렌더링되어야 한다', () => {
    render(<GoogleLoginButton state={null} />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('클릭 시 Google OAuth URL로 이동해야 한다', async () => {
    const user = userEvent.setup();
    render(<GoogleLoginButton state={null} />);

    await user.click(screen.getByRole('button'));

    expect(window.location.href).toContain('/auth/google');
  });

  it('state가 있을 때 URL에 state 파라미터가 포함되어야 한다', async () => {
    const user = userEvent.setup();
    render(<GoogleLoginButton state="mcp" />);

    await user.click(screen.getByRole('button'));

    expect(window.location.href).toContain('/auth/google?state=mcp');
  });

  it('state가 null일 때 URL에 state 파라미터가 없어야 한다', async () => {
    const user = userEvent.setup();
    render(<GoogleLoginButton state={null} />);

    await user.click(screen.getByRole('button'));

    expect(window.location.href).not.toContain('?state=');
  });

  it('outline variant가 적용되어야 한다', () => {
    render(<GoogleLoginButton state={null} />);

    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline');
  });
});
