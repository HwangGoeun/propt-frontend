import { UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';

interface GuestLoginButtonProps {
  state: string | null;
}

export function GuestLoginButton({ state }: GuestLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuthStore();

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const response = await authApi.guestLogin(state);
      
      // MCP 로그인인 경우 코드 페이지로 리다이렉트
      if (state === 'mcp' && response.ok && response.data?.code) {
        navigate(`/mcp/code?code=${response.data.code}`);
        return;
      }
      
      // 일반 로그인인 경우 템플릿 페이지로 이동
      await checkAuthStatus();
      navigate('/templates');
    } catch (error) {
      console.error('Guest login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGuestLogin}
      variant="secondary"
      type="button"
      className="w-full gap-3 font-medium cursor-pointer"
      disabled={isLoading}
    >
      <UserIcon className="w-5 h-5" />
      {isLoading ? '로그인 중...' : '게스트로 시작하기'}
    </Button>
  );
}
