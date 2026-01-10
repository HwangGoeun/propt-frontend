import { PreviewCard } from '@/components/preview/preview-card';
import type { TemplateVariable } from '@/types/template';

interface PreviewPanelProps {
  variables: TemplateVariable[] | [];
}

export function PreviewPanel({ variables }: PreviewPanelProps) {
  return (
    <aside className="w-[400px] border-l bg-muted/10 p-6 flex flex-col overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">미리보기</h2>
      <PreviewCard variables={variables} />
    </aside>
  );
}
