import { useEffect, useState } from 'react';

import { PreviewPanel } from '@/components/preview';
import { AppSidebar } from '@/components/sidebar';
import { SiteHeader } from '@/components/site-header';
import { TemplatePanel } from '@/components/template';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTemplates } from '@/hooks/use-templates';
import { useTemplateStore } from '@/stores/template-store';
import type { TemplateVariable } from '@/types/template';

export default function TemplatesPage() {
  const { data, error } = useTemplates();
  const { activeItem } = useTemplateStore();

  const [variableList, setVariableList] = useState<TemplateVariable[]>(activeItem.variables ?? []);

  useEffect(() => {
    if (data) console.log('data from backend:', data);
    if (error) console.error('error:', error);
  }, [data, error]);

  return (
    <SidebarProvider>
      <AppSidebar className="mt-14 h-[calc(100svh-3.5rem)]" />
      <div className="flex h-screen w-full flex-col bg-background text-foreground font-sans">
        <SiteHeader />

        <div className="flex flex-1 overflow-hidden pt-14">
          <TemplatePanel
            setVariableList={setVariableList}
            variableList={variableList}
          />

          <PreviewPanel
            variables={variableList}
          />
        </div>
      </div>
    </SidebarProvider >
  );
}
