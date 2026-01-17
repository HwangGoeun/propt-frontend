
import { Check, Copy, Server } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const PROPT_CONFIG = `{
  "mcpServers": {
    "propt": {
      "command": "npx",
      "args": ["-y", "propt-mcp"]
    }
  }
}`;

interface CodeBlockProps {
  title: string;
  code: string;
}

function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span className="sr-only">설정 복사</span>
        </Button>
      </div>
      <div className="relative rounded-md bg-muted p-4">
        <pre className="overflow-x-auto text-xs font-mono text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function MCPServerGuideModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Server className="h-4 w-4" />
          MCP 설정 가이드
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>MCP 서버 설정 가이드</DialogTitle>
          <DialogDescription>
            아래 설정을 복사하여 MCP 클라이언트 설정 파일에 추가하여 서버를 활성화하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <CodeBlock title="Claude Code / Claude Desktop 설정" code={PROPT_CONFIG} />
          </div>

          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <h4 className="font-semibold mb-2">설치 방법</h4>
            <ol className="list-decimal list-inside text-sm space-y-3 text-muted-foreground">
              <li>
                <strong>Claude Code:</strong>
                <div className="mt-1 ml-4">
                  <code className="bg-muted px-1 rounded text-xs">cd ~/.claude && open settings.json</code>
                </div>
              </li>
              <li>
                <strong>Claude Desktop (macOS):</strong>
                <div className="mt-1 ml-4">
                  <code className="bg-muted px-1 rounded text-xs">cd ~/Library/Application\ Support/Claude && open claude_desktop_config.json</code>
                </div>
              </li>
              <li>위 설정을 파일에 추가하고 저장합니다.</li>
              <li>애플리케이션을 재시작합니다.</li>
              <li><code className="bg-muted px-1 rounded">propt_auth_login</code> 도구로 로그인하면 사용 준비 완료!</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <h4 className="font-semibold mb-2">제공 도구</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">propt_auth_login</code> - Propt 로그인</li>
              <li><code className="bg-muted px-1 rounded">propt_auth_logout</code> - 로그아웃</li>
              <li><code className="bg-muted px-1 rounded">propt_template_list</code> - 템플릿 목록 조회</li>
              <li><code className="bg-muted px-1 rounded">propt_get_template</code> - 템플릿 상세 조회</li>
              <li><code className="bg-muted px-1 rounded">propt_prepare_batch</code> - 배치 실행 준비</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
