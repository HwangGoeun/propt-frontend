import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle: ReactNode;
  subtitleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>
      <p
        className={cn(
          'mx-auto max-w-2xl text-center text-muted-foreground',
          subtitleClassName
        )}
      >
        {subtitle}
      </p>
    </>
  );
}
