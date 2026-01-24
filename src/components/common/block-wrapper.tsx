import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface BlockWrapperProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function BlockWrapper({ title, children, onClose }: BlockWrapperProps) {
  return (
    <section className="p-4 border rounded-lg space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium pt-0.5">{title}</h3>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
