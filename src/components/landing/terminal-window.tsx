import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function TerminalWindow({
  title,
  children,
  className,
  bodyClassName,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 text-xs text-muted-foreground">{title}</span>
      </div>
      <div
        className={cn('p-4 font-mono text-sm leading-relaxed', bodyClassName)}
      >
        {children}
      </div>
    </div>
  );
}
