import { Link } from 'react-router-dom';

import { BackgroundGlow } from '@/components/landing/background-glow';
import { GuestButton } from '@/components/landing/guest-button';
import { ScrollIndicator } from '@/components/landing/scroll-indicator';
import { TerminalWindow } from '@/components/landing/terminal-window';
import { Button } from '@/components/ui/button';
import { useTypingAnimation } from '@/hooks/use-typing-animation';
import { cn } from '@/lib/utils';

const DEMO_PROMPTS = [
  '다음 코드를 리뷰해주세요: {code}\n언어: {language}, 중점사항: {focus}',
  '{topic}에 대한 블로그 글을 작성해주세요.\n대상 독자: {audience}, 톤: {tone}',
  '{product_name}의 마케팅 카피를 작성해주세요.\n타겟: {target}, USP: {usp}',
];

const GRADIENT_BUTTON_CLASS =
  'w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-700 hover:to-blue-600 sm:w-auto';

const VARIABLE_PATTERN = /(\{[^}]+\})/g;

function isVariable(part: string) {
  return part.startsWith('{') && part.endsWith('}');
}

function highlightVariables(text: string) {
  return text.split(VARIABLE_PATTERN).map((part, i) =>
    isVariable(part) ? (
      <span key={i} className="rounded bg-violet-500/20 px-1 text-violet-400">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function HeroSection() {
  const { displayText, isTyping } = useTypingAnimation({
    sequences: DEMO_PROMPTS,
    typingSpeed: 40,
    pauseDuration: 2500,
    loop: true,
  });

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16">
      <BackgroundGlow className="overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />
      </BackgroundGlow>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            프롬프트를 복붙
          </span>
          하던{'\n'}
          <br />
          시대는 끝났습니다
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          한 번 만들고, 무한히 재사용하세요.<br />
          Propt는 프롬프트를 템플릿화하여 변수만 바꿔 반복 실행할 수 있는<br />
          프롬프트 파이프라인 도구입니다.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className={GRADIENT_BUTTON_CLASS} asChild>
            <Link to="/login">지금 시작하기</Link>
          </Button>
          <GuestButton />
        </div>
      </div>

      {/* Typing demo */}
      <div className="relative z-10 mx-auto mt-16 w-full max-w-2xl rounded-xl border border-border bg-card/50 p-1 shadow-2xl animate-[glow-pulse_3s_ease-in-out_infinite]">
        <TerminalWindow
          title="template-editor.propt"
          className="border-0"
          bodyClassName="min-h-[120px] bg-card"
        >
          <span className="whitespace-pre-wrap">
            {highlightVariables(displayText)}
          </span>
          <span
            className={cn('ml-0.5 inline-block h-5 w-0.5 align-middle bg-violet-400', isTyping && 'animate-pulse')}
          />
        </TerminalWindow>
      </div>

      <ScrollIndicator />
    </section>
  );
}
