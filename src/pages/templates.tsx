import { useEffect } from 'react';

import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { AppSidebar } from '@/components/sidebar';
import { SiteHeader } from '@/components/site-header';
import { TemplateWorkspace } from '@/components/template/template-workspace';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTemplates } from '@/hooks/use-templates';
import { useTemplateStore } from '@/stores/template-store';

export default function TemplatesPage() {
  const { activeItem, setActiveItem } = useTemplateStore();
  const { data: templates = [], error, isLoading } = useTemplates();

  useEffect(() => {
    if (isLoading) return;

    const currentActiveItem = useTemplateStore.getState().activeItem;

    if (templates && templates.length > 0) {
      const hasActiveItem = currentActiveItem !== null;
      const activeItemId = currentActiveItem?.id;
      const templateExistsInList = templates.some(t => t.id === activeItemId);

      const isActiveItemInList = hasActiveItem && templateExistsInList;

      if (!isActiveItemInList) {
        const firstTemplate = {
          id: templates[0].id,
          title: templates[0].title,
          content: templates[0].content,
          variables: templates[0].variables,
          outputType: templates[0].outputType ?? null
        };
        setActiveItem(firstTemplate);
      }
    } else if (currentActiveItem !== null) {
      setActiveItem(null);
    }
  }, [templates, setActiveItem, isLoading]);

  useEffect(() => {
    if (error) console.error('error:', error);
  }, [error]);

  return (
    <SidebarProvider>
      <OnboardingTour />
      <AppSidebar className="mt-14 h-[calc(100svh-3.5rem)]" />
      <div className="flex h-screen w-full flex-col bg-background text-foreground font-sans">
        <SiteHeader />

        <div className="flex flex-1 overflow-hidden pt-14">
          {activeItem ? (
            <TemplateWorkspace key={activeItem.id} />
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="text-lg">템플릿이 없습니다</p>
                <p className="text-sm mt-2">새로운 템플릿을 생성해보세요!</p>
              </div>
            </div>
          )}
        </div>
      </div >
    </SidebarProvider >
  );
}
