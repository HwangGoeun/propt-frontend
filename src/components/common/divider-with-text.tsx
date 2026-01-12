import { cn } from '@/lib/utils';

interface DividerWithTextProps extends React.ComponentProps<'div'> {
  text?: string;
}

export function DividerWithText({ className, text = '또는', ...props }: DividerWithTextProps) {
  return (
    <div className={cn('relative', className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">{text}</span>
      </div>
    </div>
  );
}
