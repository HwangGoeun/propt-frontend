import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface BackgroundGlowProps {
  children: ReactNode;
  className?: string;
}

export function BackgroundGlow({ children, className }: BackgroundGlowProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)}>
      {children}
    </div>
  );
}
