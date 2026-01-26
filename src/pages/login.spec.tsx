import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/auth-store';

import LoginPage from './login';

describe('LoginPage', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      authStatus: 'idle',
    });
  });

  it('로그인 페이지가 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Propt: Build Pipelines/)).toBeInTheDocument();
  });

  it('LoginForm이 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('다시 오신 것을 환영합니다')).toBeInTheDocument();
  });

  it('Google 로그인 버튼이 있어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Google로 시작하기')).toBeInTheDocument();
  });

  it('게스트 로그인 버튼이 있어야 한다', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('게스트로 시작하기')).toBeInTheDocument();
  });

  it('authenticated 상태에서 /templates로 리다이렉트해야 한다', () => {
    useAuthStore.setState({
      user: { id: '1', email: 'test@test.com', name: 'Test' },
      authStatus: 'authenticated',
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.queryByText('다시 오신 것을 환영합니다')).not.toBeInTheDocument();
  });

  it('state=mcp일 때 authenticated여도 리다이렉트하지 않아야 한다', () => {
    useAuthStore.setState({
      user: { id: '1', email: 'test@test.com', name: 'Test' },
      authStatus: 'authenticated',
    });

    render(
      <MemoryRouter initialEntries={['/login?state=mcp']}>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('다시 오신 것을 환영합니다')).toBeInTheDocument();
  });
});
