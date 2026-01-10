import { TemplateHeader } from '@/components/template/template-header';
import { TextBlock } from '@/components/template/text-block';
import type { TemplateVariable } from '@/types/template';

interface TemplatePanelProps {
  setVariableList: (variables: TemplateVariable[]) => void;
  variableList: TemplateVariable[] | [];
}

export function TemplatePanel({ setVariableList, variableList }: TemplatePanelProps) {
  return (
    <main className="flex-1 flex flex-col bg-background relative overflow-y-auto">
      <TemplateHeader
        variableList={variableList}
      />

      <div className="px-10 pb-20 space-y-8 max-w-4xl mx-auto w-full">
        <TextBlock
          order={1}
          setVariableList={setVariableList}
          variableList={variableList}
        />
      </div>
    </main>
  );
}
