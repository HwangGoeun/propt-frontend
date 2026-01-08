import { useState } from 'react';

import { PreviewPanel } from '@/components/preview';
import { AppSidebar } from '@/components/sidebar';
import { SiteHeader } from '@/components/site-header';
import { TemplatePanel } from '@/components/template';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { TemplateVariable } from '@/types/template';

export default function TemplatesPage() {
  // TODO: activeItem props drilling 발생 -> 추후 상태 관리 대상
  // TODO: setActiveItem props drilling 발생 -> 추후 상태 관리 대상
  const [activeItem, setActiveItem] = useState('과제 평가');
  const [variableList, setVariableList] = useState<TemplateVariable[]>([]);

  return (
    <SidebarProvider>
      <AppSidebar
        activeItem={activeItem}
        onItemSelect={setActiveItem}
        className="mt-14 h-[calc(100svh-3.5rem)]"
      />
      <div className="flex h-screen w-full flex-col bg-background text-foreground font-sans">
        <SiteHeader
          activeItem={activeItem}
        />

        {/* Main Layout Container with top padding for fixed header */}
        <div className="flex flex-1 overflow-hidden pt-14">
          {/* Main Content Area */}
          <TemplatePanel
            activeItem={activeItem}
            setVariableList={setVariableList}
            variableList={variableList}
          />

          {/* Right Preview Pane */}
          <PreviewPanel
            activeItem={activeItem}
            variableList={variableList}
          />
        </div>
      </div>
    </SidebarProvider >
  );
}
