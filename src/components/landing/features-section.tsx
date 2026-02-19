import { FileText, GitBranch, Terminal } from 'lucide-react';

import { FadeInOnScroll } from '@/components/landing/fade-in-on-scroll';
import { SectionHeader } from '@/components/landing/section-header';
import { TerminalWindow } from '@/components/landing/terminal-window';
import { cn } from '@/lib/utils';

function TemplateVar({ name }: { name: string }) {
  return (
    <>
      <span className="text-violet-400">{'{'}</span>
      <span className="text-blue-400">{name}</span>
      <span className="text-violet-400">{'}'}</span>
    </>
  );
}

const FEATURES = [
  {
    number: '01',
    icon: FileText,
    title: '프롬프트 템플릿 관리',
    description:
      '프롬프트를 템플릿으로 저장하고, {변수}를 정의하여 재사용하세요. 한 번 만든 템플릿은 팀 전체가 공유할 수 있습니다.',
    badges: ['변수 시스템', '버전 관리'],
    visual: (
      <div className="rounded-lg border border-border bg-card p-4 font-mono text-sm">
        <div className="mb-2 text-muted-foreground">{'// template.propt'}</div>
        <div>
          <TemplateVar name="role" />
          <span className="text-foreground">로서 </span>
          <TemplateVar name="task" />
          <span className="text-foreground">를 수행해주세요.</span>
        </div>
        <div className="mt-2">
          <span className="text-foreground">언어: </span>
          <TemplateVar name="language" />
        </div>
        <div className="mt-1">
          <span className="text-foreground">톤: </span>
          <TemplateVar name="tone" />
        </div>
      </div>
    ),
  },
  {
    number: '02',
    icon: Terminal,
    title: 'MCP 연동',
    description:
      'Claude Desktop에서 직접 Propt 템플릿을 호출하세요. MCP 프로토콜로 연결하면 채팅 흐름을 벗어나지 않고 파이프라인을 실행할 수 있습니다.',
    badges: ['MCP 지원', 'Claude Desktop'],
    visual: (
      <div className="rounded-lg border border-border bg-card p-4 font-mono text-sm">
        <div className="text-muted-foreground">$ claude</div>
        <div className="mt-2 text-foreground">
          <span className="text-blue-400">User:</span> 코드 리뷰 템플릿으로
        </div>
        <div className="text-foreground">이 PR을 분석해줘</div>
        <div className="mt-2 text-foreground">
          <span className="text-violet-400">Claude:</span> Propt 템플릿을
        </div>
        <div className="text-foreground">불러와서 실행할게요...</div>
        <div className="mt-1 text-green-400">
          ✓ code-review 템플릿 실행 완료
        </div>
      </div>
    ),
  },
  {
    number: '03',
    icon: GitBranch,
    title: '배치 실행',
    description:
      '모든 실행은 독립된 컨텍스트에서 처리됩니다. 이전 응답이 다음 결과에 영향을 주지 않아, 매번 동일한 품질의 결과를 보장합니다.',
    badges: ['독립된 컨텍스트', '병렬 실행'],
    visual: (
      <TerminalWindow
        title="Claude Desktop"
        className="shadow-lg"
        bodyClassName="space-y-3"
      >
        {/* User message */}
        <div>
          <span className="text-blue-400">User:</span>
          <span className="text-foreground"> 코드 리뷰 요청 템플릿 실행해줘</span>
        </div>
        <div className="space-y-0.5 pl-2 text-muted-foreground">
          <div>
              language: <span className="text-foreground">TypeScript, Python, Go</span>
          </div>
          <div>
              focus: <span className="text-foreground">보안 취약점, 성능 최적화, 에러 처리</span>
          </div>
        </div>
        {/* Claude response */}
        <div className="mt-1">
          <span className="text-violet-400">Claude:</span>
          <span className="text-foreground"> 3개 조합으로 배치 실행할게요.</span>
        </div>
        {/* Results */}
        <div className="space-y-1.5 pl-2">
          <div className="text-green-400">
              ✓ <span className="text-foreground">TypeScript × 보안 취약점</span>
            <span className="ml-2 text-muted-foreground">1.2s</span>
          </div>
          <div className="text-green-400">
              ✓ <span className="text-foreground">Python × 성능 최적화</span>
            <span className="ml-2 text-muted-foreground">0.9s</span>
          </div>
          <div className="text-green-400">
              ✓ <span className="text-foreground">Go × 에러 처리</span>
            <span className="ml-2 text-muted-foreground">1.1s</span>
          </div>
        </div>
        <div className="text-green-400">
            ✓ 배치 실행 완료 — <span className="text-foreground">3개 결과 생성</span>
        </div>
      </TerminalWindow>
    ),
  },
];

type Feature = (typeof FEATURES)[number];

function FeatureBlock({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <FadeInOnScroll
      direction={isReversed ? 'right' : 'left'}
      className={cn(
        'flex flex-col gap-8 md:gap-12 lg:flex-row lg:items-center',
        isReversed && 'lg:flex-row-reverse'
      )}
    >
      {/* Text */}
      <div className="flex-1 space-y-4">
        <span className="text-sm font-bold text-violet-400">
          {feature.number}
        </span>
        <div className="flex items-center gap-3">
          <feature.icon className="h-6 w-6 text-violet-400" />
          <h3 className="text-2xl font-bold text-foreground">
            {feature.title}
          </h3>
        </div>
        <p className="leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {feature.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-400"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      {/* Visual */}
      <div className="w-full flex-1">{feature.visual}</div>
    </FadeInOnScroll>
  );
}

export function FeaturesSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Propt가 해결합니다"
          subtitle="프롬프트를 템플릿으로 관리하고, 반복 작업을 단 한 번만 수행하세요."
          subtitleClassName="mb-16"
        />
        <div className="space-y-24">
          {FEATURES.map((feature, index) => (
            <FeatureBlock key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
