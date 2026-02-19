import { FadeInOnScroll } from '@/components/landing/fade-in-on-scroll';
import { SectionHeader } from '@/components/landing/section-header';
import { TerminalWindow } from '@/components/landing/terminal-window';
import { useConversationAnimation } from '@/hooks/use-conversation-animation';

const CONVERSATION_LINES = [
  'User: 코드 리뷰 템플릿으로 이 PR을 분석해줘',
  'Claude: code-review 템플릿을 불러왔어요. 변수를 입력해주세요: language, focus',
  'User: TypeScript, 보안 취약점',
  'Claude: 변수를 적용해서 실행할게요...',
  'Claude: ✓ 분석 완료! 보안 이슈 2건, 성능 개선점 3건을 발견했습니다.',
];

function formatLine(text: string) {
  if (text.startsWith('User:')) {
    return (
      <>
        <span className="text-blue-400">User:</span>
        <span className="text-foreground">{text.slice(5)}</span>
      </>
    );
  }
  if (text.startsWith('Claude:')) {
    const content = text.slice(7);
    const isSuccess = content.includes('✓');
    return (
      <>
        <span className="text-violet-400">Claude:</span>
        <span className={isSuccess ? 'text-green-400' : 'text-foreground'}>
          {content}
        </span>
      </>
    );
  }
  return <span className="text-foreground">{text}</span>;
}

export function McpSection() {
  const { completedLines, currentLineText, isTyping } =
    useConversationAnimation({
      lines: CONVERSATION_LINES,
      typingSpeed: 30,
      pauseBetweenLines: 800,
      pauseAfterComplete: 3000,
      loop: true,
    });

  const showIdleCursor = !currentLineText && isTyping;

  return (
    <section className="px-6 py-30">
      <div className="mx-auto max-w-6xl">
        <FadeInOnScroll>
          <SectionHeader
            title="AI 에이전트에서 벗어나지 마세요"
            subtitle="MCP 연동으로 대화 흐름 안에서 Propt 파이프라인을 실행하세요."
            subtitleClassName="mb-12"
          />
        </FadeInOnScroll>

        <FadeInOnScroll delay={200} className="mx-auto max-w-2xl">
          <TerminalWindow
            title="Claude Desktop — MCP"
            className="shadow-2xl"
            bodyClassName="min-h-[180px]"
          >
            {completedLines.map((line, index) => (
              <div key={`${index}-${line.slice(0, 20)}`} className="mb-1.5">
                {formatLine(line)}
              </div>
            ))}
            {currentLineText && (
              <div className="mb-1.5">
                {formatLine(currentLineText)}
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-violet-400 align-middle" />
              </div>
            )}
            {showIdleCursor && (
              <span className="inline-block h-4 w-0.5 animate-pulse bg-violet-400 align-middle" />
            )}
          </TerminalWindow>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
