import { type ChangeEvent, useState } from 'react';

import { BlockWrapper } from '@/components/common/block-wrapper';
import { VariableBlock } from '@/components/template/variable-block';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { extractVariablesFromPrompt } from '@/lib/template-utils';
import { useTemplateStore } from '@/stores/template-store';
import type { TemplateVariable } from '@/types/template';

interface TextBlockProps {
  order: number;
  variables: TemplateVariable[] | [];
  setVariables: (variables: TemplateVariable[]) => void;
}

// TODO: 변수 설명 입력칸 구현 필요
export function TextBlock({ order, variables, setVariables }: TextBlockProps) {
  const { activeItem } = useTemplateStore();

  const [promptContent, setPromptContent] = useState(activeItem.content);

  function handleTextInput(e: ChangeEvent<HTMLTextAreaElement>) {
    const newPrompt = e.target.value;

    setPromptContent(newPrompt);
    setVariables(extractVariablesFromPrompt(newPrompt));
  }

  return (
    <BlockWrapper
      order={order}
      title={'텍스트 입력'}>
      <Textarea
        onChange={handleTextInput}
        placeholder={'\'{문장}\'을 {언어}로 번역해주세요.'}
        value={promptContent}
      />
      <Separator />
      <div className="space-y-4">
        <p className="text-sm font-medium">변수 설정</p>
        {
          variables.length > 0 ?
            <div>
              {variables.map((variable) => (
                <VariableBlock
                  key={variable.name}
                  variable={variable}
                />
              ))}
            </div> :
            <div className="flex items-center justify-center gap-4 bg-muted/30 p-2 rounded-md">
              <span className="text-sm font-medium pt-0.5 text-muted-foreground">
                {'{변수}를 입력해보세요!'}
              </span>
            </div>
        }
      </div>
    </BlockWrapper>
  );
}
