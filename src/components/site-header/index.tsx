import { HelpCircle } from 'lucide-react';

import { MCPServerGuideModal } from '@/components/site-header/mcp-server-guide-modal.tsx';
import { ModeToggle } from '@/components/site-header/mode-toggle';
import { SiteHeaderBreadcrumb } from '@/components/site-header/site-header-breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useOnboarding } from '@/hooks/use-onboarding';

export function SiteHeader() {
  const { restartTour } = useOnboarding();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SiteHeaderBreadcrumb />
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={restartTour}
                className="h-9 w-9"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">투어 다시 보기</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>투어 다시 보기</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ModeToggle />
        <MCPServerGuideModal />
      </div>
    </header>
  );
}
