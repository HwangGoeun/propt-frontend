import { Navigate } from 'react-router-dom';

import { LoginForm } from '@/components/auth/login-form';
import { useAuthStore } from '@/stores/auth-store';

export default function LoginPage() {
  const { authStatus } = useAuthStore();

  if (authStatus === 'authenticated') {
    return <Navigate to="/templates" replace />;
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <p className="flex items-center gap-2 self-center font-medium text-foreground">
          Propt: Build Pipelines, Not Chat Rooms.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
