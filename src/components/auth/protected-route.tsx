import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/stores/auth-store';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { authStatus: status } = useAuthStore();

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
