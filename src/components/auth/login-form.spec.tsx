import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('제목이 표시되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginForm state={null} />
      </MemoryRouter>,
    );

    expect(screen.getByText('다시 오신 것을 환영합니다')).toBeInTheDocument();
  });

  it('설명이 표시되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginForm state={null} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Google 계정으로 로그인하거나 게스트로 시작하세요')).toBeInTheDocument();
  });

  it('Google 로그인 버튼이 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginForm state={null} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Google로 시작하기')).toBeInTheDocument();
  });

  it('게스트 로그인 버튼이 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginForm state={null} />
      </MemoryRouter>,
    );

    expect(screen.getByText('게스트로 시작하기')).toBeInTheDocument();
  });

  it('구분선이 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginForm state={null} />
      </MemoryRouter>,
    );

    expect(screen.getByText('또는')).toBeInTheDocument();
  });

  it('추가 className이 적용되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginForm state={null} className="custom-class" data-testid="login-form" />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('login-form')).toHaveClass('custom-class');
  });

  it('state가 전달되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginForm state="mcp" />
      </MemoryRouter>,
    );

    expect(screen.getByText('Google로 시작하기')).toBeInTheDocument();
    expect(screen.getByText('게스트로 시작하기')).toBeInTheDocument();
  });
});
