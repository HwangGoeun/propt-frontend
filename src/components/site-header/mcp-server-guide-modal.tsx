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
import { useOnboardingStore } from '@/stores/onboarding-store';

const PROPT_CONFIG = `{
  "mcpServers": {
    "propt": {
      "url": "https://api.propt.site/mcp/sse"
    }
  }
}`;

const MCP_SSE_URL = 'https://api.propt.site/mcp/sse';
const CLAUDE_CODE_CMD = 'cd ~/.claude && open settings.json';
const CLAUDE_DESKTOP_CMD =
  'cd ~/Library/Application\\ Support/Claude && open claude_desktop_config.json';

function useCopy() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}

interface CodeBlockProps {
  title?: string;
  code: string;
  copyable?: boolean;
}

function CodeBlock({ title, code, copyable = true }: CodeBlockProps) {
  const { copied, copy } = useCopy();

  return (
    <div className="space-y-2">
      {(title || copyable) && (
        <div className="flex items-center justify-between">
          {title && <h4 className="text-base font-medium text-foreground">{title}</h4>}
          {copyable && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 ml-auto"
              onClick={() => copy(code)}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">설정 복사</span>
            </Button>
          )}
        </div>
      )}
      <div className="relative rounded-md bg-muted p-4">
        <pre className="overflow-x-auto text-sm font-mono text-foreground whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function MCPServerGuideModal() {
  const { isTourRunning, currentStep, setMcpGuideModalOpen } = useOnboardingStore();

  const handleOpenChange = (open: boolean) => {
    if (isTourRunning && currentStep === 7) {
      setMcpGuideModalOpen(open);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" data-tour="mcp-guide">
          <Server className="h-4 w-4" />
          MCP 설정 가이드
        </Button>
      </DialogTrigger>
      <DialogContent className="w-2/3 sm:max-w-none max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">MCP 서버 설정 가이드</DialogTitle>
          <DialogDescription className="text-sm">
            사용 중인 클라이언트에 맞는 설정 방법을 따라주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h4 className="text-lg font-semibold mb-1">Claude Web (claude.ai)</h4>
              <p className="text-sm text-muted-foreground mb-4">Pro, Max, Team, Enterprise 플랜 전용</p>
              <ol className="list-decimal list-inside text-base space-y-4 text-foreground">
                <li><a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="underline text-sky-500 hover:text-sky-600">Claude Web</a>에 접속한 뒤, 프로필 아이콘 클릭 → <strong>설정</strong>을 클릭합니다.</li>
                <li><strong>커넥터</strong> 탭을 선택합니다.</li>
                <li>페이지 하단의 <strong>커스텀 커넥터 추가</strong>를 클릭합니다.</li>
                <li>
                  <strong>이름</strong>에는 프로프트, <strong>원격 MCP 서버 URL</strong>에는 아래 URL을 입력하고 <strong>추가</strong>를 클릭합니다.
                  <div className="mt-2 ml-5">
                    <CodeBlock title="원격 MCP 서버 URL" code={MCP_SSE_URL} />
                  </div>
                </li>
                <li>
                  채팅 화면에서 커넥터를 활성화합니다.
                  <div className="mt-2 ml-5">
                    채팅창 입력 영역의 + 버튼 → 커넥터 → 프로프트 토글 켜기
                  </div>
                </li>
                <li><strong>프로프트 로그인</strong> 입력하면 사용 준비 완료!</li>
              </ol>
            </div>

            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h4 className="text-lg font-semibold mb-1">Claude Code / Claude Desktop</h4>
              <p className="text-sm text-muted-foreground mb-4">설정 파일에 JSON을 추가하는 방식</p>
              <ol className="list-decimal list-inside text-base space-y-4 text-foreground">
                <li>
                  터미널에서 설정 파일을 엽니다.
                  <div className="mt-2 ml-5 space-y-3">
                    <CodeBlock title="Claude Code" code={CLAUDE_CODE_CMD} />
                    <CodeBlock title="Claude Desktop (macOS)" code={CLAUDE_DESKTOP_CMD} />
                  </div>
                </li>
                <li>
                  아래 설정을 파일에 추가하고 저장합니다.
                  <div className="mt-2 ml-5">
                    <CodeBlock title="SSE 설정 (JSON)" code={PROPT_CONFIG} />
                  </div>
                </li>
                <li>
                  애플리케이션을 재시작합니다.
                  <div className="mt-2 ml-5 space-y-3">
                    <CodeBlock title="Claude Code" code="claude /restart" />
                    <CodeBlock title="Claude Desktop" code="Cmd + Q 후 재실행" copyable={false} />
                  </div>
                </li>
                <li><strong>프로프트 로그인</strong> 입력하면 사용 준비 완료!</li>
              </ol>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h4 className="text-lg font-semibold mb-3">제공 도구</h4>
            <ul className="text-base space-y-2 text-foreground">
              <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">propt_auth_login</code> - Propt 로그인</li>
              <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">propt_auth_logout</code> - 로그아웃</li>
              <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">propt_template_list</code> - 템플릿 목록 조회</li>
              <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">propt_get_template</code> - 템플릿 상세 조회</li>
              <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">propt_prepare_batch</code> - 배치 실행 준비</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
