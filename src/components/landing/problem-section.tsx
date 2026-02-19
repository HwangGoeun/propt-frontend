import type { LucideIcon } from 'lucide-react';
import { Copy, FolderOpen, MessageSquareWarning } from 'lucide-react';

import { SectionHeader } from '@/components/landing/section-header';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface PainCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}

const PAIN_POINTS = [
  {
    icon: Copy,
    title: '매번 같은 프롬프트 복붙',
    description:
      '잘 만든 프롬프트도 매번 채팅창에 복붙하고, 변수를 하나씩 바꾸느라 시간을 허비합니다.',
  },
  {
    icon: FolderOpen,
    title: '흩어진 프롬프트 관리',
    description:
      '노션, 메모장, 슬랙... 프롬프트가 여기저기 흩어져 있어 필요할 때 찾을 수 없습니다.',
  },
  {
    icon: MessageSquareWarning,
    title: '이전 대화가 결과를 오염시킴',
    description:
      '같은 프롬프트인데 결과가 다른 경험, 있지 않나요? 대화 맥락이 쌓이면 AI의 응답이 이전 답변에 영향을 받습니다.',
  },
];

function PainCard({
  icon: Icon,
  title,
  description,
  delay,
  isVisible,
}: PainCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 transition-all duration-700',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
        <Icon className="h-6 w-6 text-red-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function ProblemSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section className="px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="이런 경험, 익숙하지 않으신가요?"
          subtitle="AI를 잘 활용하고 있다고 생각했지만, 반복되는 작업에 시간을 쓰고 있었습니다."
          subtitleClassName="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PAIN_POINTS.map((point, index) => (
            <PainCard
              key={point.title}
              {...point}
              delay={index * 150}
              isVisible={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
