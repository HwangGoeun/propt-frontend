import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';
import type { User } from '@/types/auth';

interface McpConnectCardProps {
  user: User;
}

export function McpConnectCard({ user }: McpConnectCardProps) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.generateMcpCode();

      if (response.ok) {
        navigate(`/mcp/code?code=${response.data.code}`);
      } else {
        setError('코드 발급에 실패했습니다.');
      }
    } catch {
      setError('코드 발급에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseOtherAccount = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">MCP 연결</CardTitle>
          <CardDescription>
            이 계정으로 MCP 클라이언트에 연결하시겠습니까?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? '연결 중...' : '이 계정으로 연결'}
          </Button>

          <Button
            variant="outline"
            onClick={handleUseOtherAccount}
            disabled={isLoading}
          >
            다른 계정 사용
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
