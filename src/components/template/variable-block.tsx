interface VariableBlockProps {
  name: string;
  description?: string | null;
}

export function VariableBlock({ name, description }: VariableBlockProps) {
  return (
    <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-md">
      <span className="text-sm font-bold text-blue-600 min-w-20">
        {`{${name}}`}
      </span>
      <div className="flex-1 text-xs text-muted-foreground">
        {description}
      </div>
    </div>
  );
}
