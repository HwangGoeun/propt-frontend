import { PreviewPanel } from '@/components/preview';
import { TemplatePanel } from '@/components/template';
import { useAutoSave } from '@/hooks/use-auto-save';

export function TemplateWorkspace() {
  useAutoSave();

  return (
    <>
      <TemplatePanel />
      <PreviewPanel />
    </>
  );
}
