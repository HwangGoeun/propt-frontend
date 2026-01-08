import { AddBlockPlaceholder } from '@/components/template/add-block-placeholder';
import { DataTypeBlock } from '@/components/template/data-type-block';
import { LengthLimitBlock } from '@/components/template/length-limit-block';
import { TemplateHeader } from '@/components/template/template-header';
import { TextBlock } from '@/components/template/text-block';
import type { TemplateVariable } from '@/types/template';

interface TemplatePanelProps {
  activeItem: string;
  setVariableList: (variables: TemplateVariable[]) => void;
  variableList?: TemplateVariable[] | null;
}

export function TemplatePanel({ activeItem, setVariableList, variableList }: TemplatePanelProps) {
  return (
    <main className="flex-1 flex flex-col bg-background relative overflow-y-auto">
      <TemplateHeader
        title={activeItem}
        variableList={variableList}
      />

      {/* Form Sections */}
      <div className="px-10 pb-20 space-y-8 max-w-4xl mx-auto w-full">
        <TextBlock
          order={1}
          setVariableList={setVariableList}
          variableList={variableList}
        />
        <DataTypeBlock
          order={2}
        />
        <LengthLimitBlock
          order={3}
        />

        {/* Footer Placeholder */}
        <AddBlockPlaceholder />
      </div>
    </main>
  );
}
