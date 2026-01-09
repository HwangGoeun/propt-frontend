import { MCPServerGuideModal } from '@/components/site-header/mcp-server-guide-modal.tsx';
import { ModeToggle } from '@/components/site-header/mode-toggle';
import { SiteHeaderBreadcrumb } from '@/components/site-header/site-header-breadcrumb';
import type { Template } from '@/types/template';

interface SiteHeaderProps {
  activeItem: Template;
}

export function SiteHeader({ activeItem }: SiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SiteHeaderBreadcrumb
          activeItem={activeItem}
        />
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <MCPServerGuideModal />
      </div>
    </header>
  );
}
