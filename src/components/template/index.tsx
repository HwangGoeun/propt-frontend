import { TemplateHeader } from '@/components/template/template-header';
import { TextBlock } from '@/components/template/text-block';
import type { TemplateVariable } from '@/types/template';

interface TemplatePanelProps {
  variables: TemplateVariable[] | [];
  setVariables: (variables: TemplateVariable[]) => void;
}

export function TemplatePanel({ variables, setVariables }: TemplatePanelProps) {
  return (
    <main className="flex-1 flex flex-col bg-background relative overflow-y-auto">
      <TemplateHeader
        variables={variables}
      />

      <div className="px-10 pb-20 space-y-8 max-w-4xl mx-auto w-full">
        <TextBlock
          order={1}
          variables={variables}
          setVariables={setVariables}
        />
      </div>
    </main>
  );
}
