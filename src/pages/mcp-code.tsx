import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function McpCodePage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!code) {
    return (
      <div className="bg-background flex min-h-svh items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-destructive">❌ 오류</CardTitle>
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
        <CardContent className="space-y-6">
          <div className="bg-muted border border-border rounded-lg py-5 px-6">
            <code className="text-4xl font-bold tracking-[0.5em] text-foreground">
              {code}
            </code>
          </div>
          <Button onClick={handleCopy} className="w-full" size="lg">
            {copied ? '✅ 복사됨' : '📋 코드 복사'}
          </Button>
          <p className="text-muted-foreground text-sm">
            ⏱ 코드는 3분 후 만료됩니다
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
