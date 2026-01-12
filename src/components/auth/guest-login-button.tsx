import { UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';

export function GuestLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuthStore();

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      await authApi.guestLogin();
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
