import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/auth-store';

import { ProtectedRoute } from './protected-route';

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      authStatus: 'idle',
    });
  });

  it('loading 상태일 때 스피너를 표시해야 한다', () => {
    useAuthStore.setState({ authStatus: 'loading' });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('idle 상태일 때 스피너를 표시해야 한다', () => {
    useAuthStore.setState({ authStatus: 'idle' });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('authenticated 상태일 때 children을 렌더링해야 한다', () => {
    useAuthStore.setState({
      authStatus: 'authenticated',
      user: { id: '1', email: 'test@test.com', name: 'Test' },
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('unauthenticated 상태일 때 /login으로 리다이렉트해야 한다', () => {
    useAuthStore.setState({ authStatus: 'unauthenticated' });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
