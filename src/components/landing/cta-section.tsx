import { Link } from 'react-router-dom';

import { BackgroundGlow } from '@/components/landing/background-glow';
import { GuestButton } from '@/components/landing/guest-button';
import { SectionHeader } from '@/components/landing/section-header';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="relative overflow-hidden px-6 py-58">
      <BackgroundGlow>
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-600/20 to-blue-600/20 blur-[100px]" />
      </BackgroundGlow>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <SectionHeader
          title="반복은 Propt에게 맡기세요"
          subtitle={<>프롬프트 관리부터 배치 실행, MCP 연동까지.<br />지금 무료로 시작하세요.</>}
          subtitleClassName="mb-8 text-lg"
        />
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="w-full animate-[glow-pulse_3s_ease-in-out_infinite] bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-700 hover:to-blue-600 sm:w-auto"
            asChild
          >
            <Link to="/login">지금 시작하기</Link>
          </Button>
          <GuestButton />
        </div>
      </div>

    </section>
  );
}
