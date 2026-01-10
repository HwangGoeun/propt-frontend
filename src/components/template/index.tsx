import { TemplateHeader } from '@/components/template/template-header';
import { TextBlock } from '@/components/template/text-block';

export function TemplatePanel() {
  return (
    <main className="flex-1 flex flex-col bg-background relative overflow-y-auto">
      <TemplateHeader />

      <div className="px-10 pb-20 space-y-8 max-w-4xl mx-auto w-full">
        <TextBlock order={1} />
      </div>
    </main>
  );
}
