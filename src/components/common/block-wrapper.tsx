interface BlockWrapperProps {
  order: number;
  title: string;
  children: React.ReactNode;
}

export function BlockWrapper({ order, title, children }: BlockWrapperProps) {
  return (
    <section className="p-4 border rounded-lg space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground">
          {order}
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-lg font-medium pt-0.5">{title}</h3>
          {children}
        </div>
      </div>
    </section>
  );
}
