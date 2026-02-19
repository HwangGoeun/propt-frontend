import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';

export function useGuestLogin(state: string | null = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuthStore();

  const guestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.guestLogin(state);

      if (state === 'mcp' && response.ok && response.data?.code) {
        navigate(`/mcp/code?code=${response.data.code}`);
        return;
      }

      await checkAuthStatus();
      navigate('/templates');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '게스트 로그인에 실패했습니다.';
      setError(message);
      console.error('Guest login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { guestLogin, isLoading, error };
}
