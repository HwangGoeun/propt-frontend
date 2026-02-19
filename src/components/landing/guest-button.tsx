import { Button } from '@/components/ui/button';
import { useGuestLogin } from '@/hooks/use-guest-login';
import { cn } from '@/lib/utils';

export function GuestButton({ className }: { className?: string }) {
  const { guestLogin, isLoading } = useGuestLogin();
  return (
    <Button
      variant="ghost"
      size="lg"
      className={cn('w-full border border-border sm:w-auto', className)}
      onClick={guestLogin}
      disabled={isLoading}
    >
      {isLoading ? '로그인 중...' : '게스트로 체험하기'}
    </Button>
  );
}
