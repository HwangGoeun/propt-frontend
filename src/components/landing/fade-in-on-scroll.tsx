import type { ReactNode } from 'react';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  threshold?: number;
}

const TRANSFORMS = {
  up: { visible: 'translate-y-0', hidden: 'translate-y-8' },
  left: { visible: 'translate-x-0', hidden: '-translate-x-12' },
  right: { visible: 'translate-x-0', hidden: 'translate-x-12' },
};

export function FadeInOnScroll({
  children,
  className,
  direction = 'up',
  delay = 0,
  threshold = 0.2,
}: FadeInOnScrollProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold });
  const { visible, hidden } = TRANSFORMS[direction];
  const animationClass = isIntersecting
    ? `${visible} opacity-100`
    : `${hidden} opacity-0`;

  return (
    <div
      ref={ref}
      className={cn('transition-all duration-700', animationClass, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
