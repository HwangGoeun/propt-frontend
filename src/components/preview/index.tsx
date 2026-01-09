import { PreviewCard } from '@/components/preview/preview-card';
import type { Template, TemplateVariable } from '@/types/template';

interface PreviewPanelProps {
  activeItem: Template;
  variables: TemplateVariable[] | [];
}

export function PreviewPanel({ activeItem, variables }: PreviewPanelProps) {
  return (
    <aside className="w-[400px] border-l bg-muted/10 p-6 flex flex-col overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">미리보기</h2>
      <PreviewCard
        activeItem={activeItem}
        variables={variables}
      />
    </aside>
  );
}
