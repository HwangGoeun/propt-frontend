import { useState } from 'react';

import { SectionHeader } from '@/components/landing/section-header';
import { cn } from '@/lib/utils';

const VARIABLE_SETS = [
  {
    label: '조합 1',
    vars: [
      { name: 'language', value: 'TypeScript' },
      { name: 'review_focus', value: '보안 취약점' },
      { name: 'code', value: 'src/auth/login.ts' },
    ],
  },
  {
    label: '조합 2',
    vars: [
      { name: 'language', value: 'Python' },
      { name: 'review_focus', value: '성능 최적화' },
      { name: 'code', value: 'api/handlers/users.py' },
    ],
  },
];

const EXECUTION_RESULTS = [
  {
    time: '1.2s',
    description:
      'login.ts에서 보안 취약점 3개를 발견했습니다. SQL 인젝션 위험이 있는 쿼리...',
  },
  {
    time: '0.8s',
    description:
      'users.py에서 성능 최적화 포인트 5개를 발견했습니다. N+1 쿼리 문제...',
  },
];

const STEPS = [
  {
    number: 1,
    title: '템플릿 생성',
    description: '프롬프트를 작성하고 변수를 {중괄호}로 감싸세요.',
    visual: (
      <div className="rounded-lg border border-border bg-card p-4 font-mono text-sm">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-xs text-muted-foreground">새 템플릿</span>
        </div>
        <div className="space-y-1">
          <div className="text-foreground">
            다음{' '}
            <span className="rounded bg-violet-500/20 px-1 text-violet-400">
              {'{language}'}
            </span>{' '}
            코드를
          </div>
          <div className="text-foreground">
            <span className="rounded bg-violet-500/20 px-1 text-violet-400">
              {'{review_focus}'}
            </span>{' '}
            관점에서 리뷰해주세요.
          </div>
          <div className="mt-2 text-foreground">
            코드:{' '}
            <span className="rounded bg-violet-500/20 px-1 text-violet-400">
              {'{code}'}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 2,
    title: '변수 설정',
    description: '각 변수에 값을 채워 넣으세요. 여러 조합을 한번에 정의할 수 있습니다.',
    visual: (
      <div className="space-y-3">
        {VARIABLE_SETS.map((set) => (
          <div key={set.label} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-3 text-xs text-muted-foreground">{set.label}</div>
            <div className="space-y-3">
              {set.vars.map((variable) => (
                <div key={variable.name} className="flex items-center gap-3">
                  <label className="w-24 shrink-0 text-xs font-medium text-violet-400">
                    {variable.name}
                  </label>
                  <div className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground">
                    {variable.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: 3,
    title: '실행 & 결과 확인',
    description:
      '각 조합이 독립된 컨텍스트에서 실행됩니다. 이전 결과가 다음 결과에 영향을 주지 않습니다.',
    visual: (
      <div className="space-y-2">
        {EXECUTION_RESULTS.map((result) => (
          <div key={result.time} className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs text-green-400">✓ 실행 완료</span>
              <span className="rounded bg-violet-500/15 px-1.5 py-0.5 text-xs text-violet-400">
                독립 컨텍스트
              </span>
              <span className="ml-auto text-xs text-muted-foreground">{result.time}</span>
            </div>
            <p className="text-sm text-foreground">{result.description}</p>
          </div>
        ))}
      </div>
    ),
  },
];

function DesktopFlow() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-12">
      {STEPS.map((step) => (
        <div key={step.number} className="flex gap-8">
          {/* Timeline dot */}
          <div className="flex w-10 shrink-0 items-start justify-center pt-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-500 bg-gradient-to-r from-violet-600 to-blue-500 text-sm font-bold text-white">
              {step.number}
            </div>
          </div>
          {/* Content */}
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold text-foreground">
              {step.title}
            </h3>
            <p className="mb-6 text-muted-foreground">{step.description}</p>
            {step.visual}
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileFlow() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="lg:hidden">
      {/* Tabs */}
      <div className="mb-6 flex gap-2" role="tablist">
        {STEPS.map((step, index) => (
          <button
            key={step.number}
            role="tab"
            aria-selected={index === activeTab}
            onClick={() => setActiveTab(index)}
            className={cn(
              'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all',
              index === activeTab
                ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white'
                : 'bg-card text-muted-foreground'
            )}
          >
            {step.number}. {step.title}
          </button>
        ))}
      </div>
      {/* Content */}
      <div>
        <p className="mb-4 text-muted-foreground">
          {STEPS[activeTab].description}
        </p>
        {STEPS[activeTab].visual}
      </div>
    </div>
  );
}

export function FlowSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="3단계면 충분합니다"
          subtitle="복잡한 설정 없이, 바로 시작하세요."
          subtitleClassName="mb-16"
        />
        <DesktopFlow />
        <MobileFlow />
      </div>
    </section>
  );
}
