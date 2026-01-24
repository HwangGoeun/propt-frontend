import type { ChangeEvent } from 'react';

import { BlockWrapper } from '@/components/common/block-wrapper';
import { VariableBlock } from '@/components/template/variable-block';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { extractVariablesFromPrompt } from '@/lib/template-utils';
import { useTemplateStore } from '@/stores/template-store';

export function TextBlock() {
  const { activeItem, updateActiveItem } = useTemplateStore();

  if (!activeItem) return null;

  function handleTextInput(e: ChangeEvent<HTMLTextAreaElement>) {
    const newPrompt = e.target.value;

    updateActiveItem({
      content: newPrompt,
      variables: extractVariablesFromPrompt(newPrompt),
    });
  }

  return (
    <BlockWrapper
      title="텍스트 입력">
      <Textarea
        onChange={handleTextInput}
        placeholder={'\'{문장}\'을 {언어}로 번역해주세요.'}
        value={activeItem.content}
      />
      <Separator />
      <div className="space-y-4">
        <p className="text-sm font-medium">변수 설정</p>
        {
          (activeItem.variables ?? []).length > 0 ?
            <div>
              {(activeItem.variables ?? []).map((variable) => (
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
