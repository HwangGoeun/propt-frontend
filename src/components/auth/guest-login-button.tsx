import { UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useGuestLogin } from '@/hooks/use-guest-login';

interface GuestLoginButtonProps {
  state: string | null;
}

export function GuestLoginButton({ state }: GuestLoginButtonProps) {
  const { guestLogin, isLoading } = useGuestLogin(state);

  return (
    <Button
      onClick={guestLogin}
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
