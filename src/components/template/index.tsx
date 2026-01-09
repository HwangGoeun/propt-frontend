import { TemplateHeader } from '@/components/template/template-header';
import { TextBlock } from '@/components/template/text-block';
import type { Template, TemplateVariable } from '@/types/template';

interface TemplatePanelProps {
  activeItem: Template;
  setVariableList: (variables: TemplateVariable[]) => void;
  variableList: TemplateVariable[] | [];
  isMyTemplate: boolean,
}

export function TemplatePanel({ activeItem, setVariableList, variableList }: TemplatePanelProps) {
  return (
    <main className="flex-1 flex flex-col bg-background relative overflow-y-auto">
      <TemplateHeader
        title={activeItem.title}
        variableList={variableList}
      />

      <div className="px-10 pb-20 space-y-8 max-w-4xl mx-auto w-full">
        <TextBlock
          activeItem={activeItem}
          order={1}
          setVariableList={setVariableList}
          variableList={variableList}
        />
      </div>
    </main>
  );
}
