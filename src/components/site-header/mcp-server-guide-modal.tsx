
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

const NOTION_CONFIG = `{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-notion"
      ],
      "env": {
        "NOTION_API_KEY": "secret_..."
      }
    }
  }
}`;

const FILESYSTEM_CONFIG = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ]
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
            <h3 className="text-lg font-semibold">추천 서버</h3>
            <CodeBlock title="Notion 서버" code={NOTION_CONFIG} />
            <CodeBlock title="파일시스템 (Filesystem) 서버" code={FILESYSTEM_CONFIG} />
          </div>

          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <h4 className="font-semibold mb-2">사용 방법</h4>
            <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
              <li>MCP 클라이언트 설정 파일(예: config.json)을 엽니다.</li>
              <li>사용하려는 서버의 설정을 복사합니다.</li>
              <li>설정 파일의 <code>mcpServers</code> 섹션에 붙여넣습니다.</li>
              <li>변경 사항을 적용하려면 애플리케이션을 다시 시작하세요.</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
