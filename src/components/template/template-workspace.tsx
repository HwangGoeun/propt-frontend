import { PreviewPanel } from '@/components/preview';
import { TemplatePanel } from '@/components/template';
import { useAutoSave } from '@/hooks/use-auto-save';

export function TemplateWorkspace() {
  useAutoSave();

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
      <TemplatePanel />
      <PreviewPanel />
    </div>
  );
}
