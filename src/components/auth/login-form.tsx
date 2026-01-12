import { GoogleLoginButton } from '@/components/auth/google-login-button';
import { GuestLoginButton } from '@/components/auth/guest-login-button';
import { DividerWithText } from '@/components/common/divider-with-text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">다시 오신 것을 환영합니다</CardTitle>
          <CardDescription>
            Google 계정으로 로그인하거나 게스트로 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <GoogleLoginButton />
          <DividerWithText />
          <GuestLoginButton />
        </CardContent>
      </Card>
    </div >
  );
}
