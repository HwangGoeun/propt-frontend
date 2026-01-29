import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';

export default function McpCodePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuthStore();
  const code = searchParams.get('code');
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleComplete = async () => {
    if (!code) return;

    setChecking(true);
    setError(null);

    try {
      const response = await authApi.checkMcpCodeStatus(code);

      if (response.ok && response.data.used) {
        await checkAuthStatus();
        navigate('/templates');
      } else {
        setError('아직 코드가 입력되지 않았습니다. MCP에서 코드를 입력한 후 다시 시도해주세요.');
      }
    } catch {
      setError('상태 확인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setChecking(false);
    }
  };

  if (!code) {
    return (
      <div className="bg-background flex min-h-svh items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-destructive">오류</CardTitle>
            <CardDescription>코드가 없습니다. 다시 로그인해주세요.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="text-3xl mb-4">Propt</div>
          <CardTitle>로그인 성공!</CardTitle>
          <CardDescription>아래 코드를 MCP에 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted border border-border rounded-lg py-5 px-6">
            <code className="text-4xl font-bold tracking-[0.5em] text-foreground">
              {code}
            </code>
          </div>
          <Button onClick={handleCopy} variant="outline" className="w-full" size="lg">
            {copied ? '복사됨!' : '코드 복사'}
          </Button>
          <p className="text-muted-foreground text-sm">
            코드는 3분 후 만료됩니다
          </p>
          <p className="text-muted-foreground text-sm">
            코드 입력 후 확인 버튼을 눌러주세요!
          </p>
          <hr className="border-border" />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button onClick={handleComplete} className="w-full" size="lg" disabled={checking}>
            {checking ? '확인 중...' : '코드 입력 완료'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
