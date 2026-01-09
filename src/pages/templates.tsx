import { useEffect, useState } from 'react';

import { PreviewPanel } from '@/components/preview';
import { AppSidebar } from '@/components/sidebar';
import { SiteHeader } from '@/components/site-header';
import { TemplatePanel } from '@/components/template';
import { SidebarProvider } from '@/components/ui/sidebar';
import { basicTemplates } from '@/data/templates';
import { useTemplates } from '@/hooks/use-templates';
import type { TemplateVariable } from '@/types/template';

export default function TemplatesPage() {
  // TODO: activeItem props drilling 발생 -> 추후 상태 관리 대상
  // TODO: setActiveItem props drilling 발생 -> 추후 상태 관리 대상
  // setActiveItem 추후 구현 예정
  // eslint-disable-next-line
  const [activeItem, setActiveItem] = useState(basicTemplates[0]);

  const { data, error } = useTemplates();

  const [variableList, setVariableList] = useState<TemplateVariable[]>(activeItem.variables ?? []);

  useEffect(() => {
    if (data) console.log('data from backend:', data);
    if (error) console.error('error:', error);
  }, [data, error]);

  return (
    <SidebarProvider>
      <AppSidebar
        activeItem={basicTemplates[0]}
        onItemSelect={() => { }}
        className="mt-14 h-[calc(100svh-3.5rem)]"
      />
      <div className="flex h-screen w-full flex-col bg-background text-foreground font-sans">
        <SiteHeader
          activeItem={activeItem}
        />

        <div className="flex flex-1 overflow-hidden pt-14">
          <TemplatePanel
            activeItem={activeItem}
            setVariableList={setVariableList}
            variableList={variableList}
            isMyTemplate={!activeItem.id?.startsWith('basic')}
          />

          <PreviewPanel
            activeItem={activeItem}
            variables={variableList}
          />
        </div>
      </div>
    </SidebarProvider >
  );
}
